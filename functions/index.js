const { onSchedule } = require('firebase-functions/v2/scheduler');
const { logger } = require('firebase-functions');
const admin = require('firebase-admin');
const { DateTime } = require('luxon');

admin.initializeApp();
const db = admin.firestore();

const TZ = 'Europe/Berlin';

exports.lessonReminders = onSchedule(
  {
    schedule: 'every 1 minutes',
    timeZone: TZ,
    region: 'europe-west1',
    memory: '256MiB',
    timeoutSeconds: 120
  },
  async () => {
    const now = DateTime.now().setZone(TZ);
    const today = now.toFormat('yyyy-MM-dd');
    const tomorrow = now.plus({ days: 1 }).toFormat('yyyy-MM-dd');

    const userDocs = await db.collection('users').listDocuments();
    let sent = 0;

    for (const userRef of userDocs) {
      try {
        const settingsDoc = await userRef.collection('settings').doc('app').get();
        if (!settingsDoc.exists) continue;
        const settings = settingsDoc.data() || {};
        if (!settings.fcmToken || settings.notificationsEnabled === false) continue;

        const reminderMin = Number(settings.reminderMinutes) || 30;

        const lessonsSnap = await userRef
          .collection('lessons')
          .where('date', 'in', [today, tomorrow])
          .get();

        for (const lessonDoc of lessonsSnap.docs) {
          const lesson = lessonDoc.data();
          if (lesson.notified) continue;
          if (lesson.status && lesson.status !== 'planned' && lesson.status !== 'confirmed') continue;
          if (!lesson.time) continue;

          const lessonDT = DateTime.fromISO(`${lesson.date}T${lesson.time}`, { zone: TZ });
          if (!lessonDT.isValid) continue;

          const diffMin = lessonDT.diff(now, 'minutes').minutes;

          if (diffMin > reminderMin - 1 && diffMin <= reminderMin + 1) {
            const locationSuffix =
              lesson.location === 'home' ? ' · 🏠 Вдома' :
              lesson.location === 'studio' ? ' · 🎹 В залі' : '';

            const message = {
              token: settings.fcmToken,
              notification: {
                title: `🎵 Урок через ${reminderMin} хв`,
                body: `${lesson.studentName || 'Учень'} — ${lesson.time}${locationSuffix}`
              },
              webpush: {
                notification: {
                  icon: '/icon-192.png',
                  badge: '/icon-192.png',
                  tag: `lesson-${lessonDoc.id}`,
                  requireInteraction: false
                },
                fcmOptions: { link: '/' },
                data: { lessonId: lessonDoc.id }
              }
            };

            try {
              await admin.messaging().send(message);
              await lessonDoc.ref.update({ notified: true, notifiedAt: admin.firestore.FieldValue.serverTimestamp() });
              sent++;
              logger.info(`Sent reminder for lesson ${lessonDoc.id} (user ${userRef.id})`);
            } catch (err) {
              logger.error(`Send failed for lesson ${lessonDoc.id}:`, err.message || err);
              if (
                err.code === 'messaging/registration-token-not-registered' ||
                err.code === 'messaging/invalid-registration-token'
              ) {
                await userRef.collection('settings').doc('app').update({ fcmToken: admin.firestore.FieldValue.delete() });
              }
            }
          }
        }
      } catch (err) {
        logger.error(`Error processing user ${userRef.id}:`, err.message || err);
      }
    }

    logger.info(`lessonReminders tick done. Sent: ${sent}`);
  }
);

exports.resetNotifiedFlags = onSchedule(
  {
    schedule: '0 3 * * *',
    timeZone: TZ,
    region: 'europe-west1'
  },
  async () => {
    const yesterday = DateTime.now().setZone(TZ).minus({ days: 1 }).toFormat('yyyy-MM-dd');
    const userDocs = await db.collection('users').listDocuments();
    for (const userRef of userDocs) {
      const snap = await userRef.collection('lessons')
        .where('date', '<', yesterday)
        .where('notified', '==', true)
        .limit(500)
        .get();
      const batch = db.batch();
      snap.docs.forEach(d => batch.update(d.ref, { notified: admin.firestore.FieldValue.delete() }));
      if (!snap.empty) await batch.commit();
    }
  }
);

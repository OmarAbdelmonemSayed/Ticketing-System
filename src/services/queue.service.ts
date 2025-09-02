import { Queue, Worker } from 'bullmq';
import { sendMail } from './notification.service';

const connection: object = { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT };

const emailQueue = new Queue('emailQueue', { connection });

async function addEmailJob(email: string, subject: string, body: string) {
  await emailQueue.add('sendEmail', {
    to: email,
    subject,
    body
  });
  console.log('Job added to queue');
}


const emailWorker = new Worker('emailQueue', async job => {
  if (job.name === 'sendEmail') {
    await sendMail(job.data.to, job.data.subject, job.data.body);
    console.log('Email sent:', job.data.subject);
  }
}, { connection });


export {
    addEmailJob
}
import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
const users = [
    { id: '1', name: 'Ava', email: 'ava@example.com' },
    { id: '2', name: 'Ben', email: 'ben@example.com' },
];
const teams = [
    { id: '1', name: 'NightRunners' },
    { id: '2', name: 'PeakPals' },
];
const activities = [
    { id: '1', type: 'Run', duration: 30, calories: 320 },
    { id: '2', type: 'Cycle', duration: 45, calories: 410 },
];
const leaderboard = [
    { id: '1', name: 'Ava', score: 980 },
    { id: '2', name: 'Ben', score: 940 },
];
const workouts = [
    { id: '1', title: 'HIIT Cardio', difficulty: 'Intermediate' },
    { id: '2', title: 'Core Strength', difficulty: 'Beginner' },
];
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiUrl: baseUrl });
});
app.get('/api/users/', (_req, res) => {
    res.json(users);
});
app.post('/api/users/', (req, res) => {
    const user = { id: `${users.length + 1}`, ...req.body };
    users.push(user);
    res.status(201).json(user);
});
app.get('/api/teams/', (_req, res) => {
    res.json(teams);
});
app.post('/api/teams/', (req, res) => {
    const team = { id: `${teams.length + 1}`, ...req.body };
    teams.push(team);
    res.status(201).json(team);
});
app.get('/api/activities/', (_req, res) => {
    res.json(activities);
});
app.post('/api/activities/', (req, res) => {
    const activity = { id: `${activities.length + 1}`, ...req.body };
    activities.push(activity);
    res.status(201).json(activity);
});
app.get('/api/leaderboard/', (_req, res) => {
    res.json(leaderboard);
});
app.post('/api/leaderboard/', (req, res) => {
    const entry = { id: `${leaderboard.length + 1}`, ...req.body };
    leaderboard.push(entry);
    res.status(201).json(entry);
});
app.get('/api/workouts/', (_req, res) => {
    res.json(workouts);
});
app.post('/api/workouts/', (req, res) => {
    const workout = { id: `${workouts.length + 1}`, ...req.body };
    workouts.push(workout);
    res.status(201).json(workout);
});
mongoose.connect(mongoUri)
    .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});

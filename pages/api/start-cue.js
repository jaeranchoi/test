import { spawn } from 'child_process';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const pythonProcess = spawn('python', ['CueDetection/cue_performance_3.py']);
    
    pythonProcess.on('error', (err) => {
      console.error('Failed to start Python process:', err);
      res.status(500).json({ error: 'Failed to start Python process' });
    });

    return res.status(200).json({ message: 'Process started successfully' });
  } catch (error) {ㄴ
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 
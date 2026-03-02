import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Upload, Send, Zap, BarChart3, Settings, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

const APAS = () => {
  // States
  const [language, setLanguage] = useState('ar');
  const [method, setMethod] = useState('rk4');
  const [velocity, setVelocity] = useState(20);
  const [angle, setAngle] = useState(45);
  const [mass, setMass] = useState(1);
  const [dragCoeff, setDragCoeff] = useState(0.1);
  const [gravity, setGravity] = useState(9.81);
  const [trajectory, setTrajectory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [image, setImage] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const texts = {
    ar: {
      title: 'نظام تحليل المقذوفات الذكي',
      subtitle: 'محاكاة فيزيائية متقدمة مع ذكاء اصطناعي',
      velocity: 'السرعة الابتدائية (م/ث)',
      angle: 'زاوية الإطلاق (°)',
      mass: 'الكتلة (كغ)',
      drag: 'معامل المقاومة',
      gravity: 'الجاذبية (م/ث²)',
      method: 'الطريقة العددية',
      rk4: 'Runge-Kutta 4',
      euler: 'Euler',
      simulate: 'محاكاة',
      reset: 'إعادة تعيين',
      upload: 'رفع صورة',
      analyze: 'تحليل الصورة',
      chat: 'دردشة ذكية',
      language: 'اللغة',
      maxHeight: 'الارتفاع الأقصى',
      maxRange: 'المسافة الأفقية',
      timeOfFlight: 'وقت الطيران',
      energy: 'الطاقة الحركية',
      velocity3d: 'السرعة الفراغية'
    },
    en: {
      title: 'AI Projectile Analysis System',
      subtitle: 'Advanced Physics Simulation with AI',
      velocity: 'Initial Velocity (m/s)',
      angle: 'Launch Angle (°)',
      mass: 'Mass (kg)',
      drag: 'Drag Coefficient',
      gravity: 'Gravity (m/s²)',
      method: 'Numerical Method',
      rk4: 'Runge-Kutta 4',
      euler: 'Euler',
      simulate: 'Simulate',
      reset: 'Reset',
      upload: 'Upload Image',
      analyze: 'Analyze Image',
      chat: 'AI Chat',
      language: 'Language',
      maxHeight: 'Max Height',
      maxRange: 'Max Range',
      timeOfFlight: 'Time of Flight',
      energy: 'Kinetic Energy',
      velocity3d: 'Space Velocity'
    },
    fr: {
      title: 'Système d\'Analyse des Projectiles IA',
      subtitle: 'Simulation Physique Avancée avec IA',
      velocity: 'Vitesse Initiale (m/s)',
      angle: 'Angle de Lancement (°)',
      mass: 'Masse (kg)',
      drag: 'Coefficient de Traînée',
      gravity: 'Gravité (m/s²)',
      method: 'Méthode Numérique',
      rk4: 'Runge-Kutta 4',
      euler: 'Euler',
      simulate: 'Simuler',
      reset: 'Réinitialiser',
      upload: 'Télécharger Image',
      analyze: 'Analyser Image',
      chat: 'Chat IA',
      language: 'Langue',
      maxHeight: 'Hauteur Max',
      maxRange: 'Portée Max',
      timeOfFlight: 'Temps de Vol',
      energy: 'Énergie Cinétique',
      velocity3d: 'Vitesse Spatiale'
    }
  };

  const t = texts[language];

  // Physics Functions
  const computeTrajectory = async () => {
    setIsRunning(true);
    const data = method === 'rk4' ? computeRK4() : computeEuler();
    setTrajectory(data);
    computeAnalysis(data);
    setIsRunning(false);
  };

  const computeRK4 = () => {
    const dt = 0.01;
    const vx = (velocity * Math.cos(angle * Math.PI / 180));
    const vy = (velocity * Math.sin(angle * Math.PI / 180));
    const data = [];
    let x = 0, y = 0, vx_ = vx, vy_ = vy;
    let t = 0;

    for (let i = 0; i < 10000; i++) {
      if (y < 0) break;
      data.push({ x: x.toFixed(2), y: Math.max(0, y.toFixed(2)), t: t.toFixed(2) });

      const acc = -dragCoeff * Math.sqrt(vx_*vx_ + vy_*vy_) / mass;
      
      vx_ += acc * vx_ * dt;
      vy_ += (acc * vy_ - gravity) * dt;
      x += vx_ * dt;
      y += vy_ * dt;
      t += dt;
    }
    return data;
  };

  const computeEuler = () => {
    const dt = 0.01;
    const vx = (velocity * Math.cos(angle * Math.PI / 180));
    const vy = (velocity * Math.sin(angle * Math.PI / 180));
    const data = [];
    let x = 0, y = 0, vx_ = vx, vy_ = vy;
    let t = 0;

    for (let i = 0; i < 10000; i++) {
      if (y < 0) break;
      data.push({ x: x.toFixed(2), y: Math.max(0, y.toFixed(2)), t: t.toFixed(2) });

      const v = Math.sqrt(vx_*vx_ + vy_*vy_);
      vx_ -= (dragCoeff * v * vx_ / mass) * dt;
      vy_ -= (gravity + dragCoeff * v * vy_ / mass) * dt;
      x += vx_ * dt;
      y += vy_ * dt;
      t += dt;
    }
    return data;
  };

  const computeAnalysis = (data) => {
    const maxHeight = Math.max(...data.map(p => parseFloat(p.y)));
    const maxRange = parseFloat(data[data.length-1].x);
    const timeOfFlight = parseFloat(data[data.length-1].t);
    const kineticEnergy = (0.5 * mass * velocity * velocity).toFixed(2);

    setAnalysisData({
      maxHeight: maxHeight.toFixed(2),
      maxRange: maxRange.toFixed(2),
      timeOfFlight: timeOfFlight.toFixed(2),
      kineticEnergy
    });
  };

  // AI Functions
  const analyzeImage = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result.split(',')[1];
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            messages: [{
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: file.type,
                    data: base64
                  }
                },
                { type: 'text', text: 'حلل هذه الصورة للمقذوف. أعطني الزاوية المتوقعة والسرعة والكتلة تقريباً.' }
              ]
            }]
          })
        });
        const data = await response.json();
        setImageAnalysis(data.content[0].text);
      } catch (err) {
        console.error('Image analysis failed:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    
    const newMessage = { role: 'user', content: chatInput };
    const newHistory = [...chatHistory, newMessage];
    setChatHistory(newHistory);
    setChatInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 512,
          system: 'أنت خبير فيزياء متخصص في حركة المقذوفات. أجب بإيجاز على الأسئلة.',
          messages: newHistory
        })
      });
      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.content[0].text };
      setChatHistory([...newHistory, assistantMessage]);
    } catch (err) {
      console.error('Chat failed:', err);
    }
  };

  // Drawing Function
  const drawTrajectory = () => {
    const canvas = canvasRef.current;
    if (!canvas || trajectory.length === 0) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxX = Math.max(...trajectory.map(p => parseFloat(p.x))) || 1;
    const maxY = Math.max(...trajectory.map(p => parseFloat(p.y))) || 1;
    const padding = 20;
    const scaleX = (canvas.width - 2 * padding) / maxX;
    const scaleY = (canvas.height - 2 * padding) / maxY;

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    trajectory.forEach((point, idx) => {
      const x = padding + parseFloat(point.x) * scaleX;
      const y = canvas.height - padding - parseFloat(point.y) * scaleY;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();
  };

  useEffect(() => {
    drawTrajectory();
  }, [trajectory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">{t.title}</h1>
        <p className="text-center text-slate-400 mb-6">{t.subtitle}</p>

        {/* Language Selector */}
        <div className="flex justify-center gap-2 mb-6">
          {['ar', 'en', 'fr'].map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded ${language === lang ? 'bg-blue-600' : 'bg-slate-700'}`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="lg:col-span-1 bg-slate-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">⚙️ {t.method}</h2>

          <div>
            <label className="text-sm text-slate-400">{t.velocity}</label>
            <input
              type="range"
              min="1"
              max="50"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">{velocity} m/s</span>
          </div>

          <div>
            <label className="text-sm text-slate-400">{t.angle}</label>
            <input
              type="range"
              min="0"
              max="90"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">{angle}°</span>
          </div>

          <div>
            <label className="text-sm text-slate-400">{t.mass}</label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">{mass.toFixed(1)} kg</span>
          </div>

          <div>
            <label className="text-sm text-slate-400">{t.drag}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={dragCoeff}
              onChange={(e) => setDragCoeff(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">{dragCoeff.toFixed(3)}</span>
          </div>

          <div>
            <label className="text-sm text-slate-400">الطريقة</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full bg-slate-700 p-2 rounded">
              <option value="rk4">{t.rk4}</option>
              <option value="euler">{t.euler}</option>
            </select>
          </div>

          <button
            onClick={computeTrajectory}
            disabled={isRunning}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 p-3 rounded font-semibold flex items-center justify-center gap-2"
          >
            <Play size={18} /> {t.simulate}
          </button>

          <button
            onClick={() => { setTrajectory([]); setAnalysisData(null); setChatHistory([]); }}
            className="w-full bg-slate-700 hover:bg-slate-600 p-3 rounded font-semibold"
          >
            {t.reset}
          </button>
        </div>

        {/* Main Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* 2D Trajectory */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">📊 المسار</h2>
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full bg-slate-900 rounded border border-slate-700"
            />
          </div>

          {/* Analysis Results */}
          {analysisData && (
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">📈 النتائج</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-700 p-3 rounded">
                  <p className="text-sm text-slate-400">{t.maxHeight}</p>
                  <p className="text-lg font-bold">{analysisData.maxHeight} m</p>
                </div>
                <div className="bg-slate-700 p-3 rounded">
                  <p className="text-sm text-slate-400">{t.maxRange}</p>
                  <p className="text-lg font-bold">{analysisData.maxRange} m</p>
                </div>
                <div className="bg-slate-700 p-3 rounded">
                  <p className="text-sm text-slate-400">{t.timeOfFlight}</p>
                  <p className="text-lg font-bold">{analysisData.timeOfFlight} s</p>
                </div>
                <div className="bg-slate-700 p-3 rounded">
                  <p className="text-sm text-slate-400">{t.energy}</p>
                  <p className="text-lg font-bold">{analysisData.kineticEnergy} J</p>
                </div>
              </div>
            </div>
          )}

          {/* Image Analysis */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">📸 تحليل الصورة</h2>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && analyzeImage(e.target.files[0])}
                className="w-full"
              />
              {imageAnalysis && (
                <div className="bg-slate-700 p-4 rounded text-sm">
                  {imageAnalysis}
                </div>
              )}
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">💬 الدردشة الذكية</h2>
            <div className="bg-slate-900 h-48 overflow-y-auto mb-4 p-3 rounded text-sm space-y-2">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={msg.role === 'user' ? 'text-blue-300' : 'text-green-300'}>
                  <strong>{msg.role === 'user' ? 'أنت' : 'AI'}:</strong> {msg.content}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChat()}
                placeholder="اسأل عن الفيزياء..."
                className="flex-1 bg-slate-700 p-2 rounded text-white"
              />
              <button onClick={sendChat} className="bg-green-600 hover:bg-green-700 p-2 rounded">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APAS;

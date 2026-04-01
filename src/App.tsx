import React, { useState } from 'react';
import { 
  Activity, 
  AlertCircle, 
  BarChart3, 
  CheckCircle2, 
  ClipboardList, 
  Droplets, 
  FileText, 
  Info, 
  Menu, 
  Network,
  ShieldAlert, 
  Stethoscope, 
  TrendingDown,
  TrendingUp,
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data & Constants ---

const BENCHMARK_DATA = [
  { name: 'Hong Kong', PD: 70, HD: 30 },
  { name: 'México', PD: 50, HD: 50 },
  { name: 'Sudamérica', PD: 25, HD: 75 },
  { name: 'Global', PD: 11, HD: 89 },
  { name: 'Argentina', PD: 7, HD: 93 },
];

const STANDARDS = {
  asn: [
    "Elección informada y centrada en el paciente.",
    "Reducir inicio en HD con catéter.",
    "Fomentar modalidades domiciliarias.",
    "Mejorar resultados tempranos y reducir infecciones."
  ],
  era: [
    "Acceso equitativo a todas las modalidades.",
    "Favorecer estrategias costo-efectivas (DP).",
    "Programas estructurados de educación prediálisis.",
    "Integrar atención domiciliaria en el sistema."
  ]
};

const KEY_INDICATORS = [
  "Porcentaje de pacientes en DP",
  "Tasa de peritonitis",
  "Inicio programado vs urgente",
  "Uso de catéter en HD",
  "Supervivencia temprana",
  "Costos por paciente"
];

const INTRODUCTION_TEXT = `La diálisis peritoneal (DP) representa un pequeño porcentaje (<7%) de la población prevalente en diálisis en EE.UU. en comparación con Canadá (>50%). Varios estudios observacionales han reportado una mejor supervivencia temprana en DP frente a la hemodiálisis (HD). El costo anual de la HD por paciente es significativamente mayor ($87,945 vs $71,630 en 2011). La elección de la modalidad debe centrarse en el paciente tras considerar todos los factores. La mortalidad en los primeros 90 días de HD debido a bacteriemia y sepsis asociada a catéteres es mayor en comparación con los pacientes que inician en DP.`;

const ARGENTINA_CONTEXT = {
  situacion: "Subutilizada (5-8% de prevalencia). Modelo dependiente de HD con alta tasa de catéteres venosos centrales al inicio.",
  problema: "Fragmentación del sistema (Público/Privado/Obras Sociales), falta de programas estructurados y escasa educación prediálisis.",
  oportunidades: ["Estrategias PD-first", "Educación prediálisis", "Telemedicina", "Alineación de incentivos"],
  resumen: "La diálisis peritoneal en Argentina es una oportunidad estratégica subutilizada (5-8% de penetración) que permitiría mejorar la eficiencia del sistema y la calidad de vida del paciente. Su implementación como estrategia inicial reduciría complicaciones infecciosas por catéteres y optimizaría recursos mediante el tratamiento domiciliario. Fortalecer la educación prediálisis y alinear incentivos económicos es clave para cerrar la brecha entre la evidencia científica y la práctica clínica actual."
};

// --- Components ---

const SectionHeader = ({ title, icon: Icon, subtitle }: { title: string, icon: any, subtitle?: string }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-blue-600 rounded-lg text-white">
        <Icon size={20} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-500 text-sm ml-11">{subtitle}</p>}
  </div>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", className)}>
    {children}
  </div>
);

const InputGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    {children}
  </div>
);

const Select = ({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: string[] }) => (
  <select 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
  >
    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);

const Introduction = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <SectionHeader title="Introducción Clínica" icon={Info} />
    <Card className="p-8 leading-relaxed text-slate-600 border-l-4 border-l-blue-600">
      <p className="mb-4">{INTRODUCTION_TEXT}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-xs font-bold text-blue-700 uppercase mb-1">Supervivencia (1 año)</p>
          <p className="text-lg font-bold text-blue-900">DP 85.8% vs HD 80.7%</p>
          <p className="text-[10px] text-blue-600 mt-1">p {"<"} 0.01 en cohorte de EE.UU.</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Impacto Económico</p>
          <p className="text-lg font-bold text-slate-800">Ahorro de ~$16,000/año</p>
          <p className="text-[10px] text-slate-400 mt-1">Por paciente en modalidad DP.</p>
        </div>
      </div>
    </Card>

    <SectionHeader title="Contexto: Argentina" icon={Activity} subtitle="Análisis de situación y oportunidades" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">Situación y Desafíos</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase">Estado Actual</p>
            <p className="text-sm text-slate-700">{ARGENTINA_CONTEXT.situacion}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-red-600 uppercase">Problema Central</p>
            <p className="text-sm text-slate-700">{ARGENTINA_CONTEXT.problema}</p>
          </div>
          <div className="pt-2">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Oportunidades de Mejora</p>
            <div className="flex flex-wrap gap-2">
              {ARGENTINA_CONTEXT.oportunidades.map(op => (
                <span key={op} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">
                  {op}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-slate-900 text-white border-none shadow-xl">
        <h3 className="text-sm font-bold text-blue-400 uppercase mb-4 tracking-widest">Resumen Estratégico</h3>
        <p className="text-sm leading-relaxed italic opacity-90">
          "{ARGENTINA_CONTEXT.resumen}"
        </p>
        <div className="mt-6 flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
          <ShieldAlert className="text-amber-400" size={20} />
          <p className="text-[10px] text-slate-300">
            La DP representa una oportunidad estratégica para mejorar la eficiencia, accesibilidad y calidad del tratamiento renal en Argentina.
          </p>
        </div>
      </Card>
    </div>
  </motion.div>
);

const Benchmarking = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
    <SectionHeader title="Benchmarking Comparativo" icon={BarChart3} subtitle="Análisis de penetración de DP: Global vs Regional vs Local" />
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-widest">Prevalencia de Modalidad (%)</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BENCHMARK_DATA} layout="vertical" margin={{ left: 20, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} className="text-xs font-bold text-slate-500" />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" align="right" height={36}/>
              <Bar dataKey="PD" fill="#2563eb" name="Diálisis Peritoneal (%)" radius={[0, 4, 4, 0]} barSize={20} />
              <Bar dataKey="HD" fill="#cbd5e1" name="Hemodiálisis (%)" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="p-6 bg-blue-600 text-white border-none">
          <h4 className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Interpretación Clínica</h4>
          <p className="text-sm leading-relaxed">
            "Un mayor uso de DP se asocia a sistemas más eficientes y centrados en el paciente. La baja utilización en Argentina (5-8%) refleja fallas estructurales y fragmentación, no limitaciones clínicas."
          </p>
        </Card>
        <Card className="p-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Indicadores Clave</h4>
          <ul className="space-y-2">
            {KEY_INDICATORS.map(ind => (
              <li key={ind} className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-1 h-1 rounded-full bg-blue-500" />
                {ind}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 border-l-4 border-l-blue-500">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="text-blue-500" size={20} />
          <h3 className="font-bold text-slate-800">Estándares ASN</h3>
        </div>
        <ul className="space-y-2">
          {STANDARDS.asn.map((s, i) => (
            <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              {s}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-6 border-l-4 border-l-indigo-500">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-indigo-500" size={20} />
          <h3 className="font-bold text-slate-800">Estándares ERA</h3>
        </div>
        <ul className="space-y-2">
          {STANDARDS.era.map((s, i) => (
            <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
              <span className="text-indigo-500 font-bold">•</span>
              {s}
            </li>
          ))}
        </ul>
      </Card>
    </div>

    <Card className="p-6 bg-slate-50 border-slate-200">
      <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest text-center">Resumen Comparativo de Eficiencia</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-white rounded-lg border border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Mundo</p>
          <p className="text-lg font-bold text-slate-800">11% DP</p>
          <p className="text-[10px] text-slate-500 mt-1">Heterogéneo</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
          <p className="text-[10px] font-bold text-blue-500 uppercase">México</p>
          <p className="text-lg font-bold text-blue-700">~50% DP</p>
          <p className="text-[10px] text-blue-500 mt-1">Líder Regional</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Sudamérica</p>
          <p className="text-lg font-bold text-slate-800">~25% DP</p>
          <p className="text-[10px] text-slate-500 mt-1">Subutilizado</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-red-100">
          <p className="text-[10px] font-bold text-red-500 uppercase">Argentina</p>
          <p className="text-lg font-bold text-red-700">5-8% DP</p>
          <p className="text-[10px] text-red-500 mt-1">Brecha Crítica</p>
        </div>
      </div>
      <p className="mt-6 text-xs text-slate-500 text-center italic">
        "La implementación de DP refleja directamente el nivel de organización y sostenibilidad del sistema de salud."
      </p>
    </Card>
  </motion.div>
);

const ClinicalTool = () => {
  const [patient, setPatient] = useState({
    nombre: '',
    edad: '',
    sexo: 'masculino',
    peso: '',
    talla: '',
    diagnostico: '',
    estadio: '5',
    inicio: 'no',
    modalidad: 'no_aplica',
    soporte: 'adecuado'
  });

  const [evalPd, setEvalPd] = useState({
    accesoDificil: 'no',
    preferencia: 'indiferente',
    hernia: 'no',
    adherencias: 'no',
    fistula: 'no'
  });

  const [peri, setPeri] = useState({
    turbio: 'no',
    dolor: 'no',
    fiebre: 'no',
    leuco: '',
    pmn: '',
    cultivo: 'pendiente',
    germen: 'ninguno',
    dias: '',
    respuesta: 'sin_cambios',
    sepsis: 'no'
  });

  // Logic
  const getDiagnostico = () => {
    const leucoNum = parseInt(peri.leuco) || 0;
    const pmnNum = parseInt(peri.pmn) || 0;
    if (peri.turbio === 'si' && leucoNum > 100 && pmnNum >= 50) return "Alta sospecha de peritonitis";
    if (peri.turbio === 'si' || peri.dolor === 'si') return "Sospecha parcial";
    return "Baja probabilidad";
  };

  const getConducta = () => {
    const leucoNum = parseInt(peri.leuco) || 0;
    if (peri.turbio === 'si' && leucoNum > 100) return "Iniciar antibióticos intraperitoneales";
    return "Observar";
  };

  const getRiesgo = () => {
    return peri.sepsis === 'si' ? "Alto" : "Moderado/Bajo";
  };

  const diag = getDiagnostico();
  const cond = getConducta();
  const ries = getRiesgo();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      {/* Patient Data */}
      <section>
        <SectionHeader title="Datos del Paciente" icon={ClipboardList} />
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup label="Nombre del Paciente">
              <input 
                type="text" 
                value={patient.nombre} 
                onChange={e => setPatient({...patient, nombre: e.target.value})}
                placeholder="Ej: Juan Pérez"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputGroup>
            <InputGroup label="Edad">
              <input 
                type="number" 
                value={patient.edad} 
                onChange={e => setPatient({...patient, edad: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputGroup>
            <InputGroup label="Sexo">
              <Select value={patient.sexo} onChange={v => setPatient({...patient, sexo: v})} options={['masculino', 'femenino']} />
            </InputGroup>
            <InputGroup label="Peso (kg)">
              <input type="number" value={patient.peso} onChange={e => setPatient({...patient, peso: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Talla (cm)">
              <input type="number" value={patient.talla} onChange={e => setPatient({...patient, talla: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Estadio ERC">
              <Select value={patient.estadio} onChange={v => setPatient({...patient, estadio: v})} options={['3', '4', '5']} />
            </InputGroup>
            <InputGroup label="Inicio Diálisis">
              <Select value={patient.inicio} onChange={v => setPatient({...patient, inicio: v})} options={['si', 'no']} />
            </InputGroup>
            <InputGroup label="Modalidad PD">
              <Select value={patient.modalidad} onChange={v => setPatient({...patient, modalidad: v})} options={['CAPD', 'APD', 'no_aplica']} />
            </InputGroup>
            <InputGroup label="Soporte Domiciliario">
              <Select value={patient.soporte} onChange={v => setPatient({...patient, soporte: v})} options={['adecuado', 'limitado', 'ausente']} />
            </InputGroup>
          </div>
        </Card>
      </section>

      {/* PD Evaluation */}
      <section>
        <SectionHeader title="Evaluación de Candidato PD" icon={Stethoscope} />
        <Card className="p-6 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup label="Acceso Vascular Difícil">
              <Select value={evalPd.accesoDificil} onChange={v => setEvalPd({...evalPd, accesoDificil: v})} options={['si', 'no']} />
            </InputGroup>
            <InputGroup label="Preferencia Paciente">
              <Select value={evalPd.preferencia} onChange={v => setEvalPd({...evalPd, preferencia: v})} options={['PD', 'HD', 'indiferente']} />
            </InputGroup>
            <InputGroup label="Hernia Abdominal">
              <Select value={evalPd.hernia} onChange={v => setEvalPd({...evalPd, hernia: v})} options={['si', 'no']} />
            </InputGroup>
            <InputGroup label="Adherencias">
              <Select value={evalPd.adherencias} onChange={v => setEvalPd({...evalPd, adherencias: v})} options={['si', 'no']} />
            </InputGroup>
            <InputGroup label="Fístula Pleuroperitoneal">
              <Select value={evalPd.fistula} onChange={v => setEvalPd({...evalPd, fistula: v})} options={['si', 'no']} />
            </InputGroup>
          </div>
        </Card>
      </section>

      {/* Peritonitis Inputs */}
      <section>
        <SectionHeader title="Diagnóstico de Peritonitis" icon={ShieldAlert} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border-red-100">
            <h3 className="text-sm font-bold text-red-600 mb-4 uppercase tracking-widest">Parámetros Clínicos</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Líquido Turbio">
                <Select value={peri.turbio} onChange={v => setPeri({...peri, turbio: v})} options={['si', 'no']} />
              </InputGroup>
              <InputGroup label="Dolor Abdominal">
                <Select value={peri.dolor} onChange={v => setPeri({...peri, dolor: v})} options={['si', 'no']} />
              </InputGroup>
              <InputGroup label="Fiebre">
                <Select value={peri.fiebre} onChange={v => setPeri({...peri, fiebre: v})} options={['si', 'no']} />
              </InputGroup>
              <InputGroup label="Signos Sepsis">
                <Select value={peri.sepsis} onChange={v => setPeri({...peri, sepsis: v})} options={['si', 'no']} />
              </InputGroup>
              <InputGroup label="Leucocitos (cel/µL)">
                <input type="number" value={peri.leuco} onChange={e => setPeri({...peri, leuco: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500" />
              </InputGroup>
              <InputGroup label="PMN (%)">
                <input type="number" value={peri.pmn} onChange={e => setPeri({...peri, pmn: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500" />
              </InputGroup>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Laboratorio y Evolución</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Cultivo">
                <Select value={peri.cultivo} onChange={v => setPeri({...peri, cultivo: v})} options={['pendiente', 'positivo', 'negativo']} />
              </InputGroup>
              <InputGroup label="Germen">
                <Select value={peri.germen} onChange={v => setPeri({...peri, germen: v})} options={['ninguno', 'gram_positivo', 'gram_negativo', 'pseudomonas', 'hongo']} />
              </InputGroup>
              <InputGroup label="Días Tratamiento">
                <input type="number" value={peri.dias} onChange={e => setPeri({...peri, dias: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </InputGroup>
              <InputGroup label="Respuesta Clínica">
                <Select value={peri.respuesta} onChange={v => setPeri({...peri, respuesta: v})} options={['mejora', 'sin_cambios', 'empeora']} />
              </InputGroup>
            </div>
          </Card>
        </div>
      </section>

      {/* Results Output */}
      <section className="pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-900 rounded-lg text-white">
            <Activity size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Reporte de Salida</h2>
        </div>
        <Card className="overflow-hidden border-2 border-slate-900">
          <div className="bg-slate-900 p-4 flex justify-between items-center">
            <span className="text-white font-bold text-sm uppercase tracking-widest">Resumen Clínico</span>
            <span className="text-slate-400 text-[10px]">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Paciente</p>
              <p className="text-xl font-black text-slate-900">{patient.nombre || '---'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Diagnóstico</p>
              <p className={cn(
                "text-lg font-bold",
                diag.includes('Alta') ? "text-red-600" : diag.includes('parcial') ? "text-amber-600" : "text-green-600"
              )}>{diag}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Conducta</p>
              <p className="text-lg font-bold text-blue-700">{cond}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Riesgo</p>
              <p className={cn(
                "text-lg font-bold px-3 py-1 rounded-full inline-block",
                ries === 'Alto' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              )}>{ries}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
            <Info size={14} />
            <span>Basado en lógica de decisión clínica automatizada según parámetros ingresados.</span>
          </div>
        </Card>
      </section>
    </motion.div>
  );
};

const NetworkEvaluation = () => {
  const [data, setData] = useState({
    nombre: '',
    region: '',
    centros: '',
    pacientesTotal: '',
    pacientesPd: '',
    pacientesHd: '',
    inicioHdCateter: '',
    inicioProgramadoPd: '',
    tasaPeritonitis: '',
    tasaInfeccionSalida: '',
    supervivenciaTecnica: '',
    mortalidad90: '',
    hospitalizaciones: '',
    costoPd: '',
    costoHd: '',
    fecha: new Date().toISOString().split('T')[0]
  });

  // Calculations
  const pacientesPdNum = parseFloat(data.pacientesPd) || 0;
  const pacientesTotalNum = parseFloat(data.pacientesTotal) || 0;
  const porcentajePd = pacientesTotalNum > 0 ? (pacientesPdNum / pacientesTotalNum * 100) : 0;
  
  const peritonitis = parseFloat(data.tasaPeritonitis) || 0;
  const inicioHdCateter = parseFloat(data.inicioHdCateter) || 0;
  const mortalidad90d = parseFloat(data.mortalidad90) || 0;
  const costoPd = parseFloat(data.costoPd) || 0;
  const costoHd = parseFloat(data.costoHd) || 0;

  // Score Calculation
  // score = ((porcentaje_pd / 20) * 30) + ((1 - (peritonitis / 0.4)) * 25) + (((100 - inicio_hd_cateter) / 100) * 20) + (((100 - mortalidad_90d) / 100) * 15) + (((costo_hd - costo_pd) / costo_hd) * 10)
  const calculateScore = () => {
    if (pacientesTotalNum === 0) return 0;
    
    const s1 = (Math.min(porcentajePd, 20) / 20) * 30;
    const s2 = Math.max(0, (1 - (peritonitis / 0.4)) * 25);
    const s3 = ((100 - Math.min(inicioHdCateter, 100)) / 100) * 20;
    const s4 = ((100 - Math.min(mortalidad90d, 100)) / 100) * 15;
    const s5 = costoHd > 0 ? (Math.max(0, (costoHd - costoPd) / costoHd) * 10) : 0;
    
    return s1 + s2 + s3 + s4 + s5;
  };

  const score = calculateScore();

  const getNivel = (s: number) => {
    if (s < 50) return "Baja eficiencia";
    if (s < 75) return "Eficiencia intermedia";
    return "Alta eficiencia";
  };

  const nivel = getNivel(score);

  // Analysis Alerts
  const getAlertaPd = () => {
    if (porcentajePd < 10) return "Baja penetración de DP";
    if (porcentajePd < 20) return "Penetración intermedia";
    return "Buena penetración";
  };

  const getAlertaInf = () => {
    if (peritonitis > 0.4) return "Alta peritonitis";
    return "Control adecuado";
  };

  const getAlertaInicio = () => {
    if (inicioHdCateter > 50) return "Alto inicio con catéter";
    return "Inicio adecuado";
  };

  const getAlertaMort = () => {
    if (mortalidad90d > 15) return "Alta mortalidad precoz";
    return "Mortalidad esperada";
  };

  const getAlertaCostos = () => {
    if (costoHd > costoPd) return "DP costo-efectiva";
    return "Revisar costos";
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <SectionHeader 
        title="Dashboard KPI Diálisis Peritoneal Red Argentina" 
        icon={Network} 
        subtitle="Análisis de eficiencia estratégica y resultados clínicos" 
      />

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
        <div className="flex items-start gap-3">
          <Info className="text-blue-500 mt-1" size={20} />
          <div>
            <p className="text-sm text-blue-800 font-medium">Introducción Estratégica</p>
            <p className="text-xs text-blue-700 mt-1">
              La diálisis peritoneal es una estrategia costo-efectiva y subutilizada en Argentina. 
              Su expansión permite mejorar la eficiencia, el acceso y los resultados clínicos en la terapia de reemplazo renal.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Network Data */}
        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-widest flex items-center gap-2">
            <ClipboardList size={16} />
            Datos de la Red
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup label="Nombre de la Red">
              <input type="text" value={data.nombre} onChange={e => setData({...data, nombre: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej: Red Federal" />
            </InputGroup>
            <InputGroup label="Región">
              <input type="text" value={data.region} onChange={e => setData({...data, region: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej: Argentina" />
            </InputGroup>
            <InputGroup label="N° de Centros">
              <input type="number" value={data.centros} onChange={e => setData({...data, centros: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Pacientes Totales TRR">
              <input type="number" value={data.pacientesTotal} onChange={e => setData({...data, pacientesTotal: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Pacientes en PD">
              <input type="number" value={data.pacientesPd} onChange={e => setData({...data, pacientesPd: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Pacientes en HD">
              <input type="number" value={data.pacientesHd} onChange={e => setData({...data, pacientesHd: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Fecha de Auditoría">
              <input type="date" value={data.fecha} onChange={e => setData({...data, fecha: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
          </div>
        </Card>

        {/* KPI Inputs */}
        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-widest flex items-center gap-2">
            <Activity size={16} />
            Entrada de KPI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup label="Peritonitis (ep/pac/año)">
              <input type="number" step="0.1" value={data.tasaPeritonitis} onChange={e => setData({...data, tasaPeritonitis: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Inicio HD con Catéter (%)">
              <input type="number" value={data.inicioHdCateter} onChange={e => setData({...data, inicioHdCateter: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Mortalidad 90 días (%)">
              <input type="number" value={data.mortalidad90} onChange={e => setData({...data, mortalidad90: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Costo Promedio PD">
              <input type="number" value={data.costoPd} onChange={e => setData({...data, costoPd: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
            <InputGroup label="Costo Promedio HD">
              <input type="number" value={data.costoHd} onChange={e => setData({...data, costoHd: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </InputGroup>
          </div>
        </Card>
      </div>

      {/* Dashboard Output */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-900 rounded-lg text-white">
            <BarChart3 size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Análisis de Resultados</h2>
        </div>
        
        <Card className="overflow-hidden border-2 border-slate-900 shadow-2xl">
          <div className="bg-slate-900 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-blue-400 font-bold text-xs uppercase tracking-widest block mb-1">Dashboard de Red</span>
              <h4 className="text-white text-2xl font-black">{data.nombre || 'RED NO ESPECIFICADA'}</h4>
              <p className="text-slate-400 text-sm">{data.region || 'Región no especificada'} | {data.fecha}</p>
            </div>
            <div className="px-6 py-3 bg-white/10 rounded-xl border border-white/10 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Eficiencia Global (Score)</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-white text-3xl font-black">{score.toFixed(1)}</p>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                  score < 50 ? "bg-red-500 text-white" : score < 75 ? "bg-amber-500 text-white" : "bg-green-500 text-white"
                )}>{nivel}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <KpiTile label="Penetración PD" value={`${porcentajePd.toFixed(1)}%`} alert={getAlertaPd()} color={porcentajePd < 10 ? "red" : porcentajePd < 20 ? "amber" : "green"} />
              <KpiTile label="Peritonitis" value={peritonitis || '---'} alert={getAlertaInf()} color={peritonitis > 0.4 ? "red" : "green"} />
              <KpiTile label="Inicio HD Catéter" value={`${inicioHdCateter || '---'}%`} alert={getAlertaInicio()} color={inicioHdCateter > 50 ? "red" : "green"} />
              <KpiTile label="Mortalidad 90d" value={`${mortalidad90d || '---'}%`} alert={getAlertaMort()} color={mortalidad90d > 15 ? "red" : "green"} />
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown size={18} className="text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900 uppercase">Análisis de Costos y Eficiencia</h4>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Estado de Costo-Efectividad:</p>
                <p className={cn("text-lg font-black", costoHd > costoPd ? "text-green-600" : "text-slate-900")}>{getAlertaCostos()}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
              <h4 className="text-sm font-bold text-slate-900 uppercase mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                Recomendaciones Estratégicas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { cond: porcentajePd < 10, text: "Implementar estrategia PD-first de forma prioritaria." },
                  { cond: peritonitis > 0.4, text: "Reforzar protocolos de prevención de infecciones y re-entrenamiento." },
                  { cond: inicioHdCateter > 50, text: "Mejorar derivación precoz y acceso vascular temprano." },
                  { cond: mortalidad90d > 15, text: "Optimizar el inicio de terapia y el soporte nutricional/clínico." },
                  { cond: true, text: "Fortalecer la educación prediálisis estructurada." },
                  { cond: true, text: "Integrar monitoreo remoto para mejorar adherencia." }
                ].filter(r => r.cond).map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                    <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-700 font-medium">{rec.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6">
            <p className="text-white/80 text-sm italic leading-relaxed">
              <span className="font-bold text-blue-400 uppercase text-xs block mb-1">Resumen de Gestión</span>
              La red presenta <span className="text-white font-bold">{nivel.toLowerCase()}</span> con oportunidades de mejora en la penetración de DP, el control de infecciones y la organización del inicio de terapia. Se recomienda una revisión estratégica de los procesos de derivación.
            </p>
          </div>
        </Card>
      </section>
    </motion.div>
  );
};

const KpiTile = ({ label, value, alert, color }: { label: string, value: any, alert: string, color: 'red' | 'amber' | 'green' }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">{label}</p>
    <p className="text-2xl font-black text-slate-900 mb-1">{value}</p>
    <span className={cn(
      "text-[9px] font-bold px-1.5 py-0.5 rounded uppercase",
      color === 'red' ? "bg-red-100 text-red-700" : color === 'amber' ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
    )}>{alert}</span>
  </div>
);

const Recommendations = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <SectionHeader title="Recomendaciones Finales" icon={ClipboardList} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Educación al Paciente</h3>
        <ul className="space-y-3">
          {[
            'Lavado de manos estricto antes de cada conexión.',
            'Uso de mascarilla durante el procedimiento.',
            'Cuidado diario del orificio de salida con jabón neutro.',
            'Evitar inmersión en bañeras o piscinas no controladas.',
            'Reportar inmediatamente efluente turbio o fiebre.'
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              {text}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-6 bg-slate-900 text-white">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText size={20} className="text-blue-400" />
          Perlas Clínicas
        </h3>
        <div className="space-y-4 text-sm opacity-90">
          <div className="p-3 bg-white/10 rounded-lg border border-white/10">
            <p className="font-bold text-blue-300">Preservación de FRR</p>
            <p>Evitar AINEs y uso excesivo de soluciones hipertónicas si no es necesario.</p>
          </div>
          <div className="p-3 bg-white/10 rounded-lg border border-white/10">
            <p className="font-bold text-blue-300">Icodextrina</p>
            <p>Ideal para el intercambio largo (noche en DPCA, día en DPA) en transportadores rápidos.</p>
          </div>
          <div className="p-3 bg-white/10 rounded-lg border border-white/10">
            <p className="font-bold text-blue-300">DPA vs DPCA</p>
            <p>La elección debe basarse en el estilo de vida y el tipo de transporte peritoneal.</p>
          </div>
        </div>
      </Card>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'intro', label: 'Introducción', icon: Info },
    { id: 'bench', label: 'Benchmarking', icon: BarChart3 },
    { id: 'tool', label: 'Evaluación Clínica', icon: Stethoscope },
    { id: 'network', label: 'Dashboard KPI Red', icon: Network, priority: true },
    { id: 'reco', label: 'Recomendaciones', icon: ClipboardList },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'intro': return <Introduction />;
      case 'bench': return <Benchmarking />;
      case 'tool': return <ClinicalTool />;
      case 'network': return <NetworkEvaluation />;
      case 'reco': return <Recommendations />;
      default: return <Introduction />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-slate-200"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Activity size={24} strokeWidth={3} />
              <h1 className="text-xl font-black tracking-tighter">AUDIT<span className="text-slate-400">ASSIST</span></h1>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Cordoba Inc - Clinical Companion</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  activeTab === tab.id 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <tab.icon size={18} className={cn(activeTab === tab.id ? "text-white" : "text-slate-400 group-hover:text-blue-500")} />
                {tab.label}
                {tab.priority && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Estado del Sistema</p>
              <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Base de datos ISPD 2024
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-[-48px] p-2 bg-white rounded-lg shadow-md border border-slate-200"
        >
          <X size={20} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">Panel de Control</h2>
              <p className="text-3xl font-bold text-slate-900">Gestión de Diálisis Peritoneal</p>
            </div>
            <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                <Stethoscope size={20} />
              </div>
              <div className="pr-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Usuario</p>
                <p className="text-sm font-bold text-slate-700">Dr. Especialista</p>
              </div>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <div key={activeTab}>
              {renderContent()}
            </div>
          </AnimatePresence>

          <footer className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400">
              &copy; 2026 AuditAssist Cordoba Inc. Basado en guías ISPD y KDIGO. 
              <br />
              Esta herramienta es de apoyo clínico y no reemplaza el juicio médico profesional.
            </p>
          </footer>
        </div>
      </main>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

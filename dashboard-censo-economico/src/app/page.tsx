'use client';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

export default function DashboardCensoEconomico() {
  const [selectedYear, setSelectedYear] = useState('2019');
  
  // Datos de concentración económica por año
  const concentracionData = [
    { año: '2004', top5: 42.3, top10: 62.5, top15: 75.5, gini: 0.304 },
    { año: '2009', top5: 41.5, top10: 61.9, top15: 75.0, gini: 0.295 },
    { año: '2014', top5: 41.5, top10: 62.4, top15: 75.0, gini: 0.300 },
    { año: '2019', top5: 40.9, top10: 62.4, top15: 74.9, gini: 0.295 }
  ];

  // Top 15 estados por año
  const estadosPorAño: Record<string, Array<{estado: string, ue: number, participacion: number, ranking: number}>> = {
    '2004': [
      { estado: 'México', ue: 364921, participacion: 12.14, ranking: 1 },
      { estado: 'CDMX', ue: 342475, participacion: 11.40, ranking: 2 },
      { estado: 'Jalisco', ue: 214768, participacion: 7.15, ranking: 3 },
      { estado: 'Veracruz', ue: 184668, participacion: 6.15, ranking: 4 },
      { estado: 'Puebla', ue: 165237, participacion: 5.50, ranking: 5 },
      { estado: 'Guanajuato', ue: 150800, participacion: 5.02, ranking: 6 },
      { estado: 'Michoacán', ue: 141543, participacion: 4.71, ranking: 7 },
      { estado: 'Nuevo León', ue: 110163, participacion: 3.67, ranking: 8 },
      { estado: 'Oaxaca', ue: 107120, participacion: 3.56, ranking: 9 },
      { estado: 'Guerrero', ue: 95254, participacion: 3.17, ranking: 10 },
      { estado: 'Chiapas', ue: 94021, participacion: 3.13, ranking: 11 },
      { estado: 'Tamaulipas', ue: 85319, participacion: 2.84, ranking: 12 },
      { estado: 'Chihuahua', ue: 79249, participacion: 2.64, ranking: 13 },
      { estado: 'Sonora', ue: 66741, participacion: 2.22, ranking: 14 },
      { estado: 'Coahuila', ue: 66469, participacion: 2.21, ranking: 15 }
    ],
    '2019': [
      { estado: 'México', ue: 624472, participacion: 13.01, ranking: 1 },
      { estado: 'CDMX', ue: 427959, participacion: 8.92, ranking: 2 },
      { estado: 'Jalisco', ue: 335120, participacion: 6.98, ranking: 3 },
      { estado: 'Puebla', ue: 298183, participacion: 6.21, ranking: 4 },
      { estado: 'Veracruz', ue: 278230, participacion: 5.80, ranking: 5 },
      { estado: 'Guanajuato', ue: 242534, participacion: 5.05, ranking: 6 },
      { estado: 'Michoacán', ue: 230966, participacion: 4.81, ranking: 7 },
      { estado: 'Oaxaca', ue: 219176, participacion: 4.57, ranking: 8 },
      { estado: 'Chiapas', ue: 186996, participacion: 3.90, ranking: 9 },
      { estado: 'Nuevo León', ue: 151448, participacion: 3.16, ranking: 10 },
      { estado: 'Guerrero', ue: 149114, participacion: 3.11, ranking: 11 },
      { estado: 'Hidalgo', ue: 118821, participacion: 2.48, ranking: 12 },
      { estado: 'Tamaulipas', ue: 112589, participacion: 2.35, ranking: 13 },
      { estado: 'Yucatán', ue: 112503, participacion: 2.34, ranking: 14 },
      { estado: 'Sinaloa', ue: 107567, participacion: 2.24, ranking: 15 }
    ]
  };

  // Datos de movilidad en rankings
  const movilidadData = [
    { estado: 'Hidalgo', cambio: 8, tipo: 'Ascenso', ranking2004: 20, ranking2019: 12 },
    { estado: 'Yucatán', cambio: 5, tipo: 'Ascenso', ranking2004: 19, ranking2019: 14 },
    { estado: 'Baja California', cambio: 4, tipo: 'Ascenso', ranking2004: 21, ranking2019: 17 },
    { estado: 'Chiapas', cambio: 2, tipo: 'Ascenso', ranking2004: 11, ranking2019: 9 },
    { estado: 'Coahuila', cambio: -6, tipo: 'Descenso', ranking2004: 15, ranking2019: 21 },
    { estado: 'Sonora', cambio: -4, tipo: 'Descenso', ranking2004: 14, ranking2019: 18 },
    { estado: 'Chihuahua', cambio: -3, tipo: 'Descenso', ranking2004: 13, ranking2019: 16 },
    { estado: 'Morelos', cambio: -2, tipo: 'Descenso', ranking2004: 18, ranking2019: 20 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800 p-5 font-sans">
      {/* Header */}
      <div className="bg-white/95 rounded-3xl p-8 mb-6 shadow-2xl text-center backdrop-blur-sm">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          🇲🇽 CONCENTRACIÓN ECONÓMICA MÉXICO 2004-2019
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Análisis de la distribución geográfica de unidades económicas y evolución de la desigualdad regional
        </p>
      </div>

      {/* Gráfica 1: Evolución de Concentración Temporal */}
      <div className="bg-white/95 rounded-3xl p-6 mb-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-3xl font-semibold text-gray-800 mb-5 text-center">
          📈 Evolución de la Concentración Económica (2004-2019)
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={concentracionData}>
              <defs>
                <linearGradient id="colorTop5" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorTop10" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorTop15" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="año" tick={{ fontSize: 12, fill: '#374151' }} />
              <YAxis tick={{ fontSize: 12, fill: '#374151' }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
                formatter={(value: any) => [`${value}%`, '']}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="top15" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTop15)"
                name="Top 15 Estados"
              />
              <Area 
                type="monotone" 
                dataKey="top10" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTop10)"
                name="Top 10 Estados"
              />
              <Area 
                type="monotone" 
                dataKey="top5" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTop5)"
                name="Top 5 Estados"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl mt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">💡 Insights Clave:</h4>
          <ul className="text-gray-700 space-y-2">
            <li><strong>Desconcentración gradual:</strong> Top 5 pasa de 42.3% a 40.9% (-1.4 puntos)</li>
            <li><strong>Estabilidad estructural:</strong> Top 10 se mantiene estable (~62%)</li>
            <li><strong>Oligarquía persistente:</strong> 7 estados concentran consistentemente 50% de la economía</li>
          </ul>
        </div>
      </div>

      {/* Selector de año y Gráfica 2: Distribución por Estados */}
      <div className="bg-white/95 rounded-3xl p-6 mb-6 shadow-xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold text-gray-800">
            🏆 Top 15 Estados por Unidades Económicas
          </h2>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border-2 border-blue-500 rounded-xl text-lg bg-white text-gray-800 cursor-pointer hover:border-blue-600 transition-colors"
          >
            <option value="2004">2004</option>
            <option value="2019">2019</option>
          </select>
        </div>
        
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={estadosPorAño[selectedYear]?.slice(0, 10) || []} 
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="estado" 
                tick={{ fontSize: 10, fill: '#374151' }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#374151' }}
                tickFormatter={(value) => `${Math.round(value/1000)}K`}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
                formatter={(value: any) => [
                  `${Number(value).toLocaleString()} UE`,
                  'Unidades Económicas'
                ]}
              />
              <Bar 
                dataKey="ue" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-xl mt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">🎯 Análisis Comparativo:</h4>
          <div className="grid grid-cols-2 gap-5 text-gray-700">
            <div>
              <strong>Estado de México:</strong> Consolida liderazgo (12.1% → 13.0%)
              <br />
              <strong>CDMX:</strong> Pierde participación relativa (11.4% → 8.9%)
            </div>
            <div>
              <strong>Puebla:</strong> Asciende al 4° lugar nacional
              <br />
              <strong>Hidalgo:</strong> Entrada al Top 15 (mayor ascenso regional)
            </div>
          </div>
        </div>
      </div>

      {/* Gráfica 3: Movilidad en Rankings */}
      <div className="bg-white/95 rounded-3xl p-6 mb-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-3xl font-semibold text-gray-800 mb-5 text-center">
          🔄 Movilidad en Rankings Estatales (2004-2019)
        </h2>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={movilidadData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="estado" 
                tick={{ fontSize: 11, fill: '#374151' }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12, fill: '#374151' }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
                formatter={(value: any, name: any, props: any) => [
                  `${value > 0 ? '+' : ''}${value} posiciones (#${props.payload.ranking2004} → #${props.payload.ranking2019})`,
                  value > 0 ? 'Ascenso' : 'Descenso'
                ]}
              />
              <Bar dataKey="cambio" radius={[4, 4, 0, 0]}>
                {movilidadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    entry.cambio > 0 ? '#10b981' : '#ef4444'
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-xl mt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">🚀 Dinámicas Regionales Identificadas:</h4>
          <div className="grid grid-cols-2 gap-5 text-gray-700">
            <div>
              <h5 className="text-green-600 font-semibold mb-2">✅ Estados Emergentes:</h5>
              <ul className="space-y-1">
                <li><strong>Hidalgo:</strong> +8 posiciones (políticas de desarrollo industrial)</li>
                <li><strong>Yucatán:</strong> +5 posiciones (boom turístico y logístico)</li>
                <li><strong>Baja California:</strong> +4 posiciones (nearshoring)</li>
              </ul>
            </div>
            <div>
              <h5 className="text-red-600 font-semibold mb-2">⚠️ Estados en Declive:</h5>
              <ul className="space-y-1">
                <li><strong>Coahuila:</strong> -6 posiciones (crisis industria pesada)</li>
                <li><strong>Sonora:</strong> -4 posiciones (dependencia minera)</li>
                <li><strong>Chihuahua:</strong> -3 posiciones (competencia global)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusiones Finales */}
      <div className="bg-white/95 rounded-3xl p-8 shadow-xl backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          🎯 Conclusiones Estratégicas
        </h2>
        
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center">
            <h3 className="text-xl font-semibold mb-3">📊 Concentración Moderada</h3>
            <p>México mantiene una concentración económica moderada con ligera tendencia a la desconcentración</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl text-center">
            <h3 className="text-xl font-semibold mb-3">🚀 Emergencia Regional</h3>
            <p>Estados del sur-sureste emergen como nuevos polos de crecimiento económico</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-2xl text-center">
            <h3 className="text-xl font-semibold mb-3">⚖️ Reequilibrio Nacional</h3>
            <p>La economía mexicana evoluciona hacia un modelo más equilibrado regionalmente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
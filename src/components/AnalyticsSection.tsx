import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";

const AnalyticsSection = () => {
  const { t } = useLanguage();
  
  const pieData = [
    { name: 'PDFs', value: 45, color: '#3AA1FF' },
    { name: 'Images', value: 30, color: '#0A1F44' },
    { name: 'Docs', value: 25, color: '#60A5FA' }
  ];

  const barData = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 190 },
    { name: 'Wed', value: 300 },
    { name: 'Thu', value: 280 },
    { name: 'Fri', value: 350 }
  ];

  const lineData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 },
    { name: 'Jun', value: 900 }
  ];

  const chartHeight = 300; // Consistent chart height
  const chartStyle = "bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:translate-y-[-8px] h-full relative overflow-hidden";

  return (
    <section id="analytics" className="py-32 bg-white relative overflow-hidden">
      {/* Matrix background animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(58, 161, 255, 0.3) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          animation: 'matrix-move 15s linear infinite'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-[#0A1F44] mb-8">
            {t.landingPage.capabilities.search.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.landingPage.capabilities.search.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Pie Chart */}
          <div className="group flex flex-col h-full">
            <div className={chartStyle}>
              {/* Neumorphic effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-6 text-center">Files by Type</h3>
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1500}
                      paddingAngle={2}
                      strokeWidth={3}
                      stroke="#ffffff"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-6 mt-6">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600 font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3AA1FF] rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="group flex flex-col h-full">
            <div className={chartStyle}>
              <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50 opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-6 text-center">{t.landingPage.capabilities.chat.title}</h3>
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} users`} />
                    <Bar dataKey="value" fill="#3AA1FF" animationDuration={2000} radius={[8, 8, 0, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`rgba(58, 161, 255, ${0.7 + (index * 0.06)})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-[#0A1F44] rounded-lg opacity-10 animate-pulse delay-500"></div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="group flex flex-col h-full">
            <div className={chartStyle}>
              <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-emerald-50 opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#0A1F44] mb-6 text-center">{t.landingPage.capabilities.ocr.title}</h3>
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <LineChart data={lineData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} docs`} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0A1F44" 
                      strokeWidth={3}
                      animationDuration={2500}
                      dot={{ fill: '#3AA1FF', stroke: '#0A1F44', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#3AA1FF', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="absolute top-4 left-4 w-4 h-4 bg-gradient-to-r from-[#3AA1FF] to-[#0A1F44] rounded-full opacity-30 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;

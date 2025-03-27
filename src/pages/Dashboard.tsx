import BarDashboard from "./graphdash/Bar";
import PieDashboard from "./graphdash/pie";


const Dashboard: React.FC = () => {
  


  return (
    <>
      <header className="Dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignItems: 'start', margin: '0 auto' }}>
        <BarDashboard/>
        <PieDashboard/>
      </div>
    </>
  );
};

export default Dashboard;
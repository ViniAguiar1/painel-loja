import React from 'react';

const TopCategoriesCard: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '350px', // Aumentei a altura do card
      position: 'relative',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', margin: '0' }}>Categorias mais vendidas</h4>
      <span style={{ fontSize: '14px', color: '#6c757d' }}>Total 10.4k em vendas</span>

      {/* Container para os círculos */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        height: '260px', // Aumentei a altura do container para dar mais espaço aos círculos
      }}>
        {/* Círculo maior - Camisetas Polo */}
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          backgroundColor: '#D4A937',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '30px',
          left: '60px',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: '12px' }}>Camisetas Polo</div>
            <div style={{ fontSize: '20px' }}>R$ 4.5k</div>
            <div style={{ fontSize: '12px' }}>Em vendas</div>
          </div>
        </div>

        {/* Círculo médio - Tênis */}
        <div style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          backgroundColor: '#D83A34',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '60px',
          left: '160px',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: '12px' }}>Tênis</div>
            <div style={{ fontSize: '20px' }}>R$ 3.1k</div>
            <div style={{ fontSize: '12px' }}>Em vendas</div>
          </div>
        </div>

        {/* Círculo menor - Bermudas */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          backgroundColor: '#34D399',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '150px',
          left: '40px',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: '12px' }}>Bermudas</div>
            <div style={{ fontSize: '20px' }}>R$ 1.8k</div>
            <div style={{ fontSize: '12px' }}>Em vendas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategoriesCard;

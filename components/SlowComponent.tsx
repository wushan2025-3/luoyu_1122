// components/SlowComponent.tsx
async function getSlowData() {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒延迟
    return {
      data: "这是从服务器流式传输的动态数据",
      time: new Date().toLocaleTimeString(),
    };
  }
  
  export default async function SlowComponent() {
    const result = await getSlowData();
    return (
      <div style={{ 
        padding: '20px', 
        border: '2px solid #ff5722', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>🔴 动态部分 (Dynamic)</h2>
        <p>{result.data}</p>
        <p><strong>生成时间:</strong> {result.time}</p>
      </div>
    );
  }
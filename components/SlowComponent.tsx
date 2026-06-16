// components/SlowComponent.tsx

async function getSlowData() {
    // 模拟 3 秒延迟，模拟数据库查询或外部 API 调用
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    return {
      title: "动态数据流",
      content: "这部分内容是通过 React Server Components 流式传输的。",
      // 关键点：这个时间是在请求到达服务器时生成的
      timestamp: new Date().toLocaleString(),
    };
  }
  
  export default async function SlowComponent() {
    const data = await getSlowData();
  
    return (
      <div style={{ 
        padding: '20px', 
        border: '2px solid #ff5722', 
        borderRadius: '8px',
        marginTop: '20px',
        backgroundColor: '#fff3e0'
      }}>
        <h2>🔴 动态部分 (Dynamic)</h2>
        <p><strong>{data.title}</strong></p>
        <p>{data.content}</p>
        <p><strong>实时生成时间:</strong> {data.timestamp}</p>
        <p style={{ fontSize: '0.8em', color: '#666' }}>
          (注意：每次刷新页面，这个时间都会更新)
        </p>
      </div>
    );
  }

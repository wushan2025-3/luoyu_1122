// app/page.tsx
import { Suspense } from 'react';
import SlowComponent from '@/components/SlowComponent';
import { headers } from 'next/headers';

// 这个函数用于引入动态信号
async function getDynamicSignal() {
  const headersList = await headers();
  // 读取一个 header，这告诉 Next.js 此页面依赖运行时环境
  return headersList.get('user-agent') || 'unknown';
}

export default async function Home() {
  // 调用动态信号函数
  // 注意：我们不在这里 await 它来阻塞整个页面，
  // 或者我们可以 await 它，但它很快返回，不影响 Suspense 的慢组件
  const userAgent = await getDynamicSignal();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Next.js PPR 演示</h1>
      
      {/* 1. 静态部分：立即渲染 */}
      <div style={{ marginBottom: '20px', padding: '15px', background: '#e0f7fa', borderRadius: '8px' }}>
        <h2>🟢 静态部分 (Static)</h2>
        <p>这部分内容会立即显示。</p>
        <p><small>User-Agent: {userAgent}</small></p>
      </div>

      {/* 2. 动态部分：流式加载 */}
      <Suspense fallback={
        <div style={{ 
          padding: '20px', 
          border: '2px dashed #ccc', 
          borderRadius: '8px',
          marginTop: '20px',
          color: '#666'
        }}>
          <h2>⏳ 加载中... (PPR Fallback)</h2>
          <p>正在等待动态数据...</p>
        </div>
      }>
        <SlowComponent />
      </Suspense>
    </main>
  );
}
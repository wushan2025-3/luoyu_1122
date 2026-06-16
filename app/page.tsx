// app/page.tsx
import { Suspense } from 'react';
import SlowComponent from '@/components/SlowComponent';
import { headers } from 'next/headers'; // 引入 headers 以强制页面进入 PPR 模式而非纯静态

// 获取构建时的静态时间
// 注意：在 PPR 模式下，这部分内容会在构建时被固化到 HTML 中
const staticTimestamp = new Date().toLocaleString();

export default async function Home() {
  // 读取 headers 是为了告诉 Next.js 这个页面有动态潜力，从而启用 PPR 而不是纯静态生成
  // 如果不读 headers/cookies，Next.js 可能会把整个页面都静态化，导致动态部分也在构建时生成
  await headers(); 

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Next.js PPR (部分预渲染) 演示</h1>
      
      {/* --- 静态部分 (Static Shell) --- */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        background: '#e0f7fa', 
        borderRadius: '8px',
        border: '1px solid #b2ebf2'
      }}>
        <h2>🟢 静态部分 (Pre-rendered)</h2>
        <p>这部分内容在构建时已生成，并缓存在 CDN 上。</p>
        <p><strong>静态时间戳:</strong> {staticTimestamp}</p>
        <p style={{ fontSize: '0.8em', color: '#555' }}>
          (注意：无论你刷新多少次，这个时间在下次重新部署前都不会改变)
        </p>
      </div>

      {/* --- 动态部分 (Dynamic Stream) --- */}
      <Suspense fallback={
        <div style={{ 
          padding: '20px', 
          border: '2px dashed #ccc', 
          borderRadius: '8px',
          marginTop: '20px',
          color: '#666',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>⏳ 加载中... (Streaming)</h2>
          <p>正在等待服务器动态数据...</p>
        </div>
      }>
        <SlowComponent />
      </Suspense>

      <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          <strong>观察指南:</strong><br/>
          1. 页面加载时，蓝色区域（静态）立即显示。<br/>
          2. 虚线框（Loading）随后出现。<br/>
          3. 3秒后，橙色区域（动态）替换虚线框，显示<strong>当前实时时间</strong>。<br/>
          4. 对比两个时间：静态时间是固定的，动态时间是实时的。
        </p>
      </div>
    </main>
  );
}

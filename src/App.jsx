import { Suspense } from 'react';
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import routes from '~react-pages'; // 插件生成的虚拟模块

function AppRoutes() {
  return useRoutes(routes);
}

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <AppRoutes />
      </Router>
    </Suspense>
  );
};

export default App;

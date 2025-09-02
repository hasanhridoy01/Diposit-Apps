import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
  //       <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <Router>
      <div className="App">
        {/* {user ? <Dashboard /> : <LoginForm />} */}
        <Dashboard />
      </div>
    </Router>
  );
}

export default App;
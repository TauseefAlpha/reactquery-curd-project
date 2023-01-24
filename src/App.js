
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import UserList from './component/UserList';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'



const queryClient = new QueryClient()

function App() {
  return (
    <>
   
      <QueryClientProvider client={queryClient}>
       <div className="App">
        <UserList />
        </div>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      {/* <EditUserMod/> */}

    </>
  );
}

export default App;

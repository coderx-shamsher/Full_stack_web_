import '../src/App.css'
import ProductCard from './components/ProductCard';
import UserCard from './components/UserCard';


function App() {
  return (
    <>
      <div className="testing">
        <h2>Hi its react Typescript Testing 01 </h2>
      </div>

      <UserCard Username={"bob"} Email={"bob@gmail.com"} isAdmin={true}/>
      <UserCard Username={"bob"} Email={"bob@gmail.com"} isAdmin={false}/>

      <div className='productcard'>
          <ProductCard productname={"headphone"} price={1000} />
          <ProductCard productname={"smartphone"} price={20000} />
      </div>
    </>
  );
}

export default App;

import {React, lazy,Suspense} from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import {Col,Row,Container} from "react-bootstrap"
import Wallet from "./Wallet";
const Layout=lazy(()=>import("./layout"));
function Home(){

return(
<>
<Wallet/>

<Suspense fallback={<div>Loading...</div>}>

<Layout/>
</Suspense>

</>
)
}

export default Home;
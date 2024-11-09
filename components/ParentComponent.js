import Aside from "./Aside";
import Header from "./Header";


function ParentComponent(props) {


    return (
        <div>
         <Header  HandleAsideOpen={props.appAsideOpen}/>
         <Aside  asideOpen={props.appOpen}  HandleAsideOpen={props.appAsideOpen} />
        </div>
    );
}

export default ParentComponent;

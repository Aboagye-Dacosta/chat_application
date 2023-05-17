import Background from "../components/Background";
import SideNav from "../components/SideNav";

function AppLayout(props) {
  return (
    <Background>
      <div className="w-screen flex flex-col md:grid md:grid-cols-[3rem,5fr] md:w-11/12 md:mx-auto h-screen md:my-2  md:h-[calc(100vh-2rem)] rounded-md overflow-hidden">
        <SideNav />
        {props.children}
      </div>
    </Background>
  );
}

export default AppLayout;

import { useState, useEffect, createContext } from "react";
import jsonData from "./Data.json";
// ech packeg is designated  to a differnet component
export const Sidebarcontext = createContext({ SetSideBarForm: () => {} });
export const Glarycontext = createContext({ GlaryData: [] });
export const GraduateContext = createContext({ GraduateData: [] });
export const LogIncontexst = createContext({ Login: {}, SetLogin: () => {} });
export const DegreesContext = createContext({ degreesData: {} });
export const Registercontext = createContext({
  degreeOption: [],
  SetdegreeOption: () => {},
});
export const SingUp_degreeContext = createContext({ CerentUser: {} ,DegreeDate:[]});
export const DegreeSingUpContext = createContext({ CerentUser: {} });

const MainContext = ({ children }) => {

  const [SidebarForm, SetSideBarForm] = useState();
  const GlaryData = jsonData.Glary;
  const degreesData = jsonData.degree;
  const GraduateData = jsonData.Graduate;
  const DegreeDate=jsonData.date_degree


  const [degreeOption, SetdegreeOption] = useState(Object.keys(DegreeDate));


  const [CerentUser, SetCerentUser] = useState();

  const [sideBarArray, SetsideBarArray] = useState(
    localStorage.getItem("SideBar")
      ? JSON.parse(localStorage.getItem("SideBar"))
      : []
  );
 
 
  useEffect(() => {
    SidebarForm && SetsideBarArray([...sideBarArray, SidebarForm]);
    SidebarForm &&
      localStorage.setItem("SideBar", JSON.stringify(sideBarArray));
  }, [SidebarForm]);
  const Users = JSON.parse(localStorage.getItem("Users"));
  const [Login, SetLogin] = useState({});
  useEffect(() => {
    if (Login && Users) {
      let CerentUserNO_valid = Users.find(
        (element) => element.Username === Login.Username
      );

      if (
        CerentUserNO_valid &&
        CerentUserNO_valid.password === Login.password
      ) {
        SetCerentUser(CerentUserNO_valid);
      }
    }
  }, [Login]);
  

  // DB

  return (
    <GraduateContext.Provider value={{GraduateData}}>
    <DegreeSingUpContext.Provider value={{CerentUser}}>
      <SingUp_degreeContext.Provider value={{ CerentUser,DegreeDate }}>
        <Registercontext.Provider value={{ degreeOption, SetdegreeOption }}>
          <LogIncontexst.Provider value={{ Login, SetLogin }}>
            <Glarycontext.Provider value={{ GlaryData }}>
              <DegreesContext.Provider value={{ degreesData }}>
                <Sidebarcontext.Provider value={{ SetSideBarForm }}>
                  {children}
                </Sidebarcontext.Provider>
              </DegreesContext.Provider>
            </Glarycontext.Provider>
          </LogIncontexst.Provider>
        </Registercontext.Provider>
      </SingUp_degreeContext.Provider>
    </DegreeSingUpContext.Provider>
    </GraduateContext.Provider>
  );
};

export default MainContext;

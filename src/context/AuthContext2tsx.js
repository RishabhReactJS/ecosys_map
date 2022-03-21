// import React from 'react';
// import {fakeAuthProvider} from '../utils/fakeAuth';
// import {handleSingup, handleLogin} from '../utils/firebase';

// interface AuthContextType {
//     user: any;
//     signin: (payload: object, callback: VoidFunction) => void;
//     signout: (callback: VoidFunction) => void;
//   }

// let AuthContext = React.createContext<AuthContextType>(null!);

// function AuthProvider({ children }: { children: React.ReactNode }) {
//   let [user, setUser] = React.useState<any>(null);

//   let signin = (payload: object, callback: VoidFunction) => {
//     return fakeAuthProvider.signin(() => {
//       console.log('payload in sign<><<<<>>>>.', payload);
//       handleLogin(payload);
//       // handleSingup(payload);
//       setUser(payload);
//       callback();
//     });
//   };

//   let signout = (callback: VoidFunction) => {
//     return fakeAuthProvider.signout(() => {
//       setUser(null);
//       callback();
//     });
//   };

//   let value = { user, signin, signout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export default function useAuth() {
//   return React.useContext(AuthContext);
// }
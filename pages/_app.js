import { Provider } from "next-auth/client";
import "../styles/globals.css";
import "../styles/main.css";
import Layout from "../components/layout/layout";
import { ContextProvider } from "../store/context";
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </Provider>
  );
}

// export async function getServerSideProps(context) {
//   console.log(context);
//   const response = await fetch("http://localhost:3000/api/user-data/get-user", {
//     method: "POST",
//     body: JSON.stringify("test@gmail.com"),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   if (!data) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { data: data },
//   };
// }
export default MyApp;

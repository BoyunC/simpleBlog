import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ShowPage from './pages/ShowPage';
import AdminPage from './pages/AdminPage';

const routes = [
  {
    path : "/",
    component : HomePage,
  },
  {
    path : "/blogs",
    component : ListPage,
  },
  {
    path : "/admin",
    component : AdminPage,
  },
  {
    path : "/blogs/create",
    component : CreatePage,
  },
  {
    path : "/blogs/:id/edit",
    component : EditPage,
  },
  {
    // id값이 들어가는 라우트를 설정할 때는 가장 마지막에 선언해줘야 다른 페이지로 넘어가는 것을 막을 수 있음 
    path : "/blogs/:id",
    component : ShowPage,
  },
];


export default routes;
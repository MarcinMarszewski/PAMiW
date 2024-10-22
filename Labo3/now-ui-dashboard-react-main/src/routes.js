/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import TableList from "views/TableList.js";
import Statistics from "views/Statistics.js";

var dashRoutes = [
  {
    path: "/statistics",
    name: "Statistics",
    icon: "business_chart-bar-32",
    component: <Statistics />,
    layout: "/admin",
  },
  {
    path: "/book-tables",
    name: "Book List",
    icon: "files_paper",
    component: <TableList />,
    layout: "/admin",
  }
];
export default dashRoutes;

import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import LandingPage from "../pages/ClientPage/LandingPage";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardPage from "@/pages/AdminPage/DashboardPage";
import ProductPage from "@/pages/AdminPage/ProductPage";
import HeathyBeautyPage from "@/pages/AdminPage/HeathyBeautyPage";
import HeathyBeautyAddPage from "@/pages/AdminPage/HeathyBeautyPage/AddPage";
import HeathyBeautyViewPage from "@/pages/AdminPage/HeathyBeautyPage/ViewPage";
import BrandPage from "@/pages/AdminPage/BrandPage";
import DealsPage from "@/pages/AdminPage/DealsPage";
import OrderPage from "@/pages/AdminPage/OrderPage";
import DermaHairPage from "@/pages/AdminPage/DermaHairPage";
import ClinicPage from "@/pages/AdminPage/ClinicPage";
import BrandAddPage from "@/pages/AdminPage/BrandPage/AddPage";
import BrandViewPage from "@/pages/AdminPage/BrandPage/ViewPage";
import AddProductPage from "@/pages/AdminPage/ProductPage/AddPage";
import ViewProductPage from "@/pages/AdminPage/ProductPage/UpdatePage";
import HotDealsPage from "@/pages/AdminPage/HotDealsPage";
import FlashDealsPage from "@/pages/AdminPage/FlashDealsPage";
import HotDealsAddPage from "@/pages/AdminPage/HotDealsPage/AddPage";
import HotDealsViewPage from "@/pages/AdminPage/HotDealsPage/ViewPage";
import ProductDetail from "@/pages/ClientPage/ProductDetail";
import CheckoutPage from "@/pages/ClientPage/CheckoutPage";

export const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/san-pham/:id",
        element: <ProductDetail />,
      },
      {
        path: "/checkout/cart",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <DashboardPage />,
      },
      {
        path: "/admin/products",
        element: <ProductPage />,
      },
      {
        path: "/admin/products/create",
        element: <AddProductPage />,
      },
      {
        path: "/admin/products/:id",
        element: <ViewProductPage />,
      },
      {
        path: "/admin/categories/heathy-&-beauty",
        element: <HeathyBeautyPage />,
      },
      {
        path: "/admin/categories/hasaki-clinic-&-spa",
        element: <ClinicPage />,
      },
      {
        path: "/admin/categories/dermahair",
        element: <DermaHairPage />,
      },
      {
        path: "/admin/categories/heathy-&-beauty/create",
        element: <HeathyBeautyAddPage />,
      },
      {
        path: "/admin/categories/heathy-&-beauty/:id",
        element: <HeathyBeautyViewPage />,
      },
      {
        path: "/admin/brands",
        element: <BrandPage />,
      },
      {
        path: "/admin/brands/create",
        element: <BrandAddPage />,
      },
      {
        path: "/admin/brands/:id",
        element: <BrandViewPage />,
      },
      {
        path: "/admin/deals/hot-deals",
        element: <HotDealsPage />,
      },
      {
        path: "/admin/deals/hot-deals/create",
        element: <HotDealsAddPage />,
      },
      {
        path: "/admin/deals/hot-deals/:id",
        element: <HotDealsViewPage />,
      },
      {
        path: "/admin/deals/flash-deals",
        element: <FlashDealsPage />,
      },
      {
        path: "/admin/orders",
        element: <OrderPage />,
      },
    ],
  },
]);

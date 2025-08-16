import {
  AdminLayout,
  CheckoutLayout,
  ClientLayout,
  CustomerLayout,
} from "@/layouts";
import {
  AccountEditPage,
  AccountPage,
  AddProductPage,
  AddressAddPage,
  AddressPage,
  AddressViewPage,
  BookingPage,
  BrandAddPage,
  BrandClientPage,
  BrandPage,
  BrandProductPage,
  BrandViewPage,
  CartPage,
  CategoryProductsPage,
  CheckoutPage,
  ClinicPage,
  DashboardPage,
  DermaHairPage,
  DiscountCodePage,
  FlashDealsPage,
  HeathyBeautyAddPage,
  HeathyBeautyPage,
  HeathyBeautyViewPage,
  HotDealClientPage,
  HotDealsAddPage,
  HotDealsPage,
  HotDealsViewPage,
  LandingPage,
  ListOrderPage,
  LoyaltyPage,
  OrderPage,
  ProductDetail,
  ProductPage,
  QuestionPage,
  RepurchasePage,
  ViewProductPage,
  WishlistPage,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";

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
        element: <CartPage />,
      },
      {
        path: "/danh-muc/:id",
        element: <CategoryProductsPage />,
      },
      {
        path: "/thuong-hieu",
        element: <BrandClientPage />,
      },
      {
        path: "/thuong-hieu/:id",
        element: <BrandProductPage />,
      },
      {
        path: "/campaign/wow",
        element: <HotDealClientPage />,
      },
      {
        path: "customer",
        element: <CustomerLayout />,
        children: [
          { path: "address/index", element: <AddressPage /> },
          { path: "address/new", element: <AddressAddPage /> },
          { path: "address/edit/:id", element: <AddressViewPage /> },
          { path: "account/index", element: <AccountPage /> },
          { path: "account/edit", element: <AccountEditPage /> },
          { path: "loyalty/home", element: <LoyaltyPage /> },
          { path: "order/history", element: <ListOrderPage /> },
          { path: "booking/history", element: <BookingPage /> },
          { path: "wishlist/index", element: <WishlistPage /> },
          { path: "repurchase-product", element: <RepurchasePage /> },
          { path: "question", element: <QuestionPage /> },
        ],
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
      {
        path: "/admin/discounts",
        element: <DiscountCodePage />,
      },
    ],
  },
  {
    path: "/",
    element: <CheckoutLayout />,
    children: [
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
]);

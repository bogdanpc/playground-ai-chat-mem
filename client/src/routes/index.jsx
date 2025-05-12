import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutPublic from "@/layouts/LayoutPublic";
import LayoutPrivate from "@/layouts/LayoutPrivate";
import ProtectedRoute from "./ProtectedRoute";
import { role } from "@/auth/session-utils";

const LoginPage = lazy(() => import("@/pages/login/Login"));
const NotFound = lazy(() => import("@/pages/NotFound/not-found"));
const ChatPage = lazy(() => import("@/modules/chat/Chat/ChatPage"));
const KnowledgeImport = lazy(() => import("@/modules/kdb/RagImport"));
const Embeddings = lazy(() => import("@/modules/kdb/Embeddings"));
const Embedding = lazy(() => import("@/modules/kdb/Embedding"));
const Documents = lazy(() => import("@/modules/kdb/Documents"));

const routesDefault = [
    { path: "*", exact: true, component: NotFound }
];
const routes = [
    { path: "/", component: ChatPage },
    { path: "/knowledge/documents", component: Documents },
    { path: "/knowledge/embeddings", component: Embeddings },
    { path: "/knowledge/embeddings/:id", component: Embedding },
    { path: "/knowledge/import", component: KnowledgeImport },
];

export default () => <Routes>
    <Route element={<ProtectedRoute><LayoutPrivate /></ProtectedRoute>}>
        {routes
            .filter(r => !role() || !r.rolesAllowed || r.rolesAllowed.includes(role()))
            .map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
    </Route>
    <Route element={<LayoutPublic />}>
        <Route key="login" path="/login" element={<LoginPage />} />
    </Route>
    {routesDefault.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
    ))}
</Routes>
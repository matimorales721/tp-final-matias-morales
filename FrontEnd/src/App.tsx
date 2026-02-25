import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { HomeRedirectPage } from './pages/HomeRedirectPage'
import { UsersListPage } from './pages/UsersListPage'
import { UserFormPage } from './pages/UserFormPage'
import { UserDetailPage } from './pages/UserDetailPage'
import { PetsListPage } from './pages/PetsListPage'
import { PetFormPage } from './pages/PetFormPage'
import { PetDetailPage } from './pages/PetDetailPage'
import { HistoryFormPage } from './pages/HistoryFormPage'
import { OwnersListPage } from './pages/OwnersListPage'
import { OwnerFormPage } from './pages/OwnerFormPage'
import { OwnerDetailPage } from './pages/OwnerDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomeRedirectPage />} />

        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <UsersListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/usuarios/nuevo"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <UserFormPage mode="create" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/usuarios/:id"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <UserDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/usuarios/:id/editar"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <UserFormPage mode="edit" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/duenos"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <OwnersListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/duenos/nuevo"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <OwnerFormPage mode="create" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/duenos/:id"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <OwnerDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/duenos/:id/editar"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <OwnerFormPage mode="edit" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mascotas"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <PetsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mascotas/nueva"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <PetFormPage mode="create" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mascotas/:id"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <PetDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mascotas/:id/editar"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <PetFormPage mode="edit" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/historiales/nuevo"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <HistoryFormPage mode="create" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historiales/:id/editar"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VETERINARIO', 'RECEPCIONISTA']}>
              <HistoryFormPage mode="edit" />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

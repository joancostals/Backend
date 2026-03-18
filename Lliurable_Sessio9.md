# Lliurable - Sessió 9: Desenvolupament Web Full Stack

**Repositori GitHub**: (Posa aquí el teu enllaç un cop fet el commit)

## Detall de les implementacions realitzades:

### 1. Instal·lació de dependències
S'ha instal·lat `jsonwebtoken` i `bcryptjs` en el directori `Backend/api` per gestionar els JSON Web Tokens (accessos) i el xifratge de les contrasenyes, tal i com es descrivia en les instruccions.

### 2. Actualització del Model d'Usuari (`User.js`)
S'han afegit al model de `mongoose` del fitxer `src/models/User.js` els camps necessaris:
- `role`: Pren per defecte el valor de `'client'`, acceptant opcionalment el d'`'admin'`.
- `refreshToken`: Emmagatzema la cadena del token per a processos de renovació de l'Access Token.

### 3. Controlador i Rutes d'Autenticació (`authController.js` i `authRoutes.js`)
S'ha seguit l'estructura requerida dissenyant un controlador exclusiu amb aquests endpoints vinculats a `/api/auth` (declarat a `index.js`):
- **POST `/register`**: Rep dades. Valida que l'email no estigui duplicat, *hasheja* la contrasenya i crea l'usuari de la base de dades.
- **POST `/login`**: Buscar l'usuari adient i valida credencials de bcrypt. Genera i retorna el JWT *Access Token* (15 min de temps de vida) i un *Refresh Token* (caducitat als 7 dies, de desament a BD).
- **POST `/refresh`**: Comprova que el Refresh Token associat estigui a la BD, validant-lo mitjançant JWT per emetre en conseqüència el pertinent nou Access Token de 15 minuts.
- **POST `/logout`**: Esborra el Refresh Token persistent a l'usuari de la BD.

### 4. Middlewares de Seguretat (`authMiddleware.js` i `roleMiddleware.js`)
Els controladors i fluxos queden controlats gràcies a l'arquitectura de seguretat en `/middlewares`:
- **`authMiddleware.js`**: Protegeix rutes verificant l'existència d'un Bearer format JWT, desxifrant el seu origen i assignant a peticions `req.user = decoded` l'àmbit d'accés i seguretat d'aquell qui cridi.
- **`roleMiddleware.js`**: Comprova en calent si el rol de l'endpoint està equiparat al de l'usuari (ex. només permet admins quan `roles.includes('admin')`).

**Exemple d'aplicació del Role-Based Access Control:**
S'han implementat validacions de rol per rutes de `palaRoute.js` (per exemple les funcions PUT, DELETE, i POST de nous objectes) afegint un primer filtre amb *authMiddleware* combinat finalitzat amb referència un *roleMiddleware*:
```javascript
// POST crear pala en palaRoute.js
router.post('/', authenticateToken, roleMiddleware('admin'), async (req, res) => {
    // ... Codi d'acció exclusiu de palaService ...
});
```

Aquests arxius estan enllaçats localment i llestos per usar a l'API amb qualsevol client extern de provatura, o directament per Frontend proper!

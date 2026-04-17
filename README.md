# Turborepo con Convex + Better Auth + Nextjs

## Importante

Agregar este override en package json ya que el plugin de compatibilidad de Convex y Better Auth no es compatible con la ultima versión.

``` typescript
"overrides": {
    "better-auth": "1.5.6"
}
```

Para la migración del schema utilizar

`bun x auth generate --config ./convex/betterAuth/auth.ts --output ./convex/betterAuth/schema.ts`
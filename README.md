# React Permission

A Permission component for React.

## Installation

```
npm install @synzhang/react-permission
```

## Quick Start

```js
export const ROLES = ["ADMIN", "USER"];
export const POLICIES = {
  "item:delete": (item, user) => {
    if (user.role === "ADMIN") {
      return true;
    }

    if (user.role === "USER" && item.userId === user.id) {
      return true;
    }

    return false;
  },
};
```

```js
<PermissionProvider currentUser={currentUser} roles={ROLES} policies={POLICIES}>
  <App />
</PermissionProvider>
```

### Role based access control

```js
<Permission allowedRoles={["ADMIN"]}>{"Sensitive Content"}</Permission>
```

### Permission based access control

```js
import POLICIES from "policies";

<Permission policyCheck={POLICIES["item:delete"](item, user)}>
  {"Sensitive Operation"}
</Permission>;
```

## API

### PermissionProvider

| Property    | Type   | Default | Description         |
| ----------- | ------ | ------- | ------------------- |
| currentUser | object | null    | Current user object |
| roles       | array  | []      | Roles               |
| policies    | object | {}      | Policies            |

### Permission

| Property          | Type            | Default | Description                  |
| ----------------- | --------------- | ------- | ---------------------------- |
| policyCheck       | function        | null    | Policy check function        |
| allowedRoles      | array           | []      | Allowed roles                |
| forbiddenFallback | React.Component | null    | Forbidden fallback component |
| children          | React.Component | null    | Children component           |

## License

[MIT](https://choosealicense.com/licenses/mit/)

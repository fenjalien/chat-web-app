# Chat Web App
A chat web app built using:
- [yjs](https://github.com/yjs/yjs)
- [Hocuspocus](https://github.com/ueberdosis/hocuspocus)
- [React](https://react.dev/)
- [Joy UI](https://mui.com/joy-ui/getting-started/)
- [TypeScript](https://www.typescriptlang.org/)

![image](https://github.com/fenjalien/chat-web-app/assets/34489450/eb0696cf-a7bc-4e07-841f-131594264dd2)

## Local Development
Run 
```
npm install
```
in both `frontend` and `backend` folders.
Start the backend with the following command in `backend/`:
```
npm run start
```
Start the frontend with the following command in `frontend/`:
```
npm run dev
```
### Remote Devices
To access the application on a remote device on the same network, change the `url` parameter in the `HocuspocusProvider` configuration in `frontend/src/App.tsx` to the IPv4 address of the device the backend is running on. Then start the backend normally and run the following command in `frontend/`:
```
npm run dev -- --host
```

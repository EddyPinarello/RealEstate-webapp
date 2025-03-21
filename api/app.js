import express from 'express';
import cookieParser from 'cookie-parser';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import testRoute from './routes/test.route.js'
import userRoute from './routes/user.route.js'
import chatRoute from './routes/chat.route.js'
import messageRoute from './routes/message.route.js'

import cors from "cors"

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true })); //CORS FOR LET CLIENT DO POST AND ALSO CREDENTIALS TO SEND COOKIES
app.use(express.json());
app.use(cookieParser());
 
app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);
app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

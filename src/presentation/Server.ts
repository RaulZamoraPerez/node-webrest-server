import express, { Router } from 'express';
import path from 'path';

interface Options{
    port: number
    routes: Router
    public_path?: string;
}

export class Server{

    private app = express();
    private readonly port: number;
    private public_path: string;
    private readonly routes: Router;

    constructor(options: Options){
        //inicializar 
        const {port, routes, public_path = "public"} = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start(){


        //* Middlewares
        this.app.use(express.json());//cualquier peticion que pase al serever se va a parsear a json pq sino las peticiones no se van a poder leer  deja hacerlo con raw
        this.app.use(express.urlencoded({extended:true}));// www-form-urlencoded
        
        //* Public folder
        this.app.use(express.static(this.public_path)); //public folder


        //* Routes
       
        this.app.use( this.routes);

        //SPA
        this.app.get('*', (req, res)=>{
            const indexPath = path.join(__dirname, `../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        })

        this.app.listen(this.port, () => {
            console.log(` Server running on port ${this.port}`);
        }); 
    }
}

//readonly es para q no se pueda modificar el valor de la propiedad
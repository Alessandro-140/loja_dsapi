
// NO TERMINAL DO VISUAL STUDIO CODE
// SE FOR EXECUTAR NÂO ESQUECER DE ENTRAR NA PASTA "api"
// PS C:\xampp\htdocs\tarefa_banco>cd api
// PS C:\xampp\htdocs\tarefa_banco\api> 

const restify = require("restify");
const errors = require("restify-errors");

const servidor = restify.createServer({
    name: "loja_dsapi",
    version: "1.0.0",
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable)); // Este não interfere na inserção =POST

servidor.use(restify.plugins.queryParser()); // Este não interfere na inserção =POST

servidor.use(restify.plugins.bodyParser());// Sem este não insere = POST


// Está é a porta para ser impresso no navegador ==> http://localhost:8001/produtos
servidor.listen(8001, function () {

    console.log("%s executando em &s", servidor.name, servidor.url); // &s
});


var knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "loja_dsapi"
    }
});

servidor.get("/", (req, res, next) => {
res.send(" Bem vindo(a) a API loja");
});

servidor.get("/cidades", (req, res, next) => { // Aqui trás todos valores pela "URL"
    knex("cidades").then((dados) => { // São os valores impressos dos elementos das colunas
        res.send(dados); // Estes serão os dados impressos = elementos da tabela com id, nome, preço
        
        
    }, next);
    });
    
servidor.get("/clientes", (req, res, next) => { // Aqui trás todos valores pela "URL"
    knex("clientes").then((dados) => { // São os valores impressos dos elementos das colunas
        res.send(dados); // Estes serão os dados impressos = elementos da tabela com id, nome, preço
        
        
    }, next);
    });
    
servidor.get("/pedidos", (req, res, next) => { // Aqui trás todos valores pela "URL"
    knex("pedidos").then((dados) => { // São os valores impressos dos elementos das colunas
        res.send(dados); // Estes serão os dados impressos = elementos da tabela com id, nome, preço
        
        
    }, next);
    });


servidor.get("/categorias", (req, res, next) => { // Aqui trás todos valores pela "URL"
    knex("categorias").then((dados) => { // São os valores impressos dos elementos das colunas
        res.send(dados); // Estes serão os dados impressos = elementos da tabela com id, nome, preço
        
        
    }, next);
    });
            
servidor.get("/produtos", (req, res, next) => { // Aqui trás todos valores pela "URL"
    knex("produtos").then((dados) => { // São os valores impressos dos elementos das colunas
        res.send(dados); // Estes serão os dados impressos = elementos da tabela com id, nome, preço
            
            
        }, next);
        });

servidor.get("/pedidos_produtos", (req, res, next) => { // Aqui trás todos valores pela "URL"
    knex("pedidos_produtos").then((dados) => { // São os valores impressos dos elementos das colunas
        res.send(dados); // Estes serão os dados impressos = elementos da tabela com id, nome, preço
            
            
        }, next);
        });
                
    //========================================
    servidor.get('/cidades/:idCidade', (req, res, next) => { // Aqui trás os valores totais pela "URL", usando a chave primaria que é o "id"
        
    const idCid = req.params.idCidade;
    knex('cidades')
        .where('id', idCid)
        .first()
        .then((dados) => {
    if (!dados) {
        return res.send(new errors.BadRequestError('Cidade não encontrada'));
    }
        res.send(dados);
        }, next);
    });
    
servidor.post('/cidades', (req,res, next) => {
    knex('cidades')
        .insert(req.body)
        .then( (dados) => {
        res.send(dados);
    }, next);    
});

servidor.put('/cidades/:idCidade', (req,res, next) => {
    const idCid = req.params.idCidade;
    knex('cidades')
        .where( 'id', idCid)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Cidade não encontrada'));
        }
        res.send('Cidade Atualizada');
    }, next);    
});

servidor.del('/cidades/:idCidade', (req,res, next) => {
    const idCid = req.params.idCidade;
    knex('cidades')
        .where( 'id', idCid)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Cidade não encontrada'));
        }
        res.send('Cidade deletada com sucesso');
    }, next);    
});
    
servidor.get("/clientes/:idClientes", (req, res, next) => { // Aqui trás os valores totais pela "URL", usando a chave primaria que é o "id"
    
const idCl = req.params.idClientes;
knex("clientes")
    .where("id", idCl)
    .first()
    .then((dados) => {
if (!dados) {
        return res.send(new errors.BadRequestError("Cliente não encontrado"));
}
    res.send(dados);
    }, next);
});
        
servidor.post('/clientes', (req,res, next) => {
    knex('clientes')
        .insert(req.body)
        .then( (dados) => {
            if( !dados ){
                return res.send( new errors.BadRequestError('Cliente não inserido!'));
            }
        res.send('Cliente inserido com sucesso com ' + 'id = ' +dados);
    }, next);    
});

servidor.put('/clientes/:idCliente', (req,res, next) => {
    const idCl= req.params.idCliente;
    knex('clientes')
        .where( 'id', idCl)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Cliente não atualizado!'));
        }
        res.send('Cliente Atualizado com sucesso!');
    }, next);    
});


servidor.del('/clientes/:idCliente', (req,res, next) => {
    const idCl = req.params.idCliente;
    knex('clientes')
        .where( 'id', idCl)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Cliente não deletado tente novamente!'));
        }
        res.send('Cliente excluido com sucesso!');
    }, next);    
});


servidor.get("/pedidos/:idPedidos", (req, res, next) => { // Aqui trás os valores totais pela "URL", usando a chave primaria que é o "id"
    
const idPed = req.params.idPedidos;
knex("pedidos")
    .where("id", idPed)
    .first()
    .then((dados) => {
if (!dados) {
        return res.send(new errors.BadRequestError("Pedido não encontrado e produto inesistente"));
}
    res.send(dados);
    }, next);
});

servidor.post('/pedidos', (req,res, next) => {
    knex('pedidos')
        .insert(req.body)
        .then( (dados) => {
    if( !dados ){
    return res.send( new errors.BadRequestError('Pedido não inserido'));
    }
        res.send('Pedido inserido com sucesso com ' + 'id = ' +dados);
    }, next);    
});

servidor.put('/pedidos/:idPedidos', (req,res, next) => {
    const idPed = req.params.idPedidos;
    knex('pedidos')
        .where( 'id', idPed)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Pedido não atualizado tente novamente!'));
        }
        res.send('Pedido Atualizado');
    }, next);    
});

// Aqui é no "body"
servidor.del('/pedidos/:idPedidos', (req,res, next) => {
    const idPed = req.params.idPedidos;
    knex('pedidos')
        .where( 'id', idPed)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Pedido não excluido tente novamente!'));
        }
        res.send('Pedido excluido com sucesso!');
    }, next);    
});

servidor.get("/categorias/:idCategorias", (req, res, next) => { // Aqui trás os valores totais pela "URL", usando a chave primaria que é o "id"
    
const idCateg = req.params.idcategorias;
knex("categorias")
    .where("id", idCateg)
    .first()
    .then((dados) => {
if (!dados) {
        return res.send(errors.BadRequestError("Categoria não encontrada"));
}
    res.send(dados);
    }, next);
});


servidor.post('/categorias', (req,res, next) => {
    knex('categorias')
        .insert(req.body)
        .then( (dados) => {
            res.send(dados);            
    }, next);
});   
    
servidor.put('/categorias/:idCategorias', (req,res, next) => {
    const idCateg = req.params.idCategorias;
    knex('categorias')
        .where( 'id', idCateg)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Categoria não encontrada'));
        }
        res.send('Categoria Atualizada');
    }, next);
});

servidor.del('/categorias/:idCategorias', (req,res, next) => {
    const idCateg = req.params.idCategorias;
    knex('categorias')
        .where( 'id', idCateg)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Categoria não encontrada'));
        }
        res.send('Categoria não encontrada');
    }, next);    
});

servidor.get('/produtos/:idProdutos', (req,res, next) => {
    const idProduto = req.params.idProdutos; 
    knex('produtos')
        .where( 'id', idProduto)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produtos não encontrados'));
        }
        res.send(dados);
    }, next);    
});

servidor.post('/produtos', (req,res, next) => {
    knex('produtos')
        .insert(req.body)
        .then( (dados) => {
    if( !dados ){
        return res.send(new errors.BadRequestError('Produtos não inseridos!'));
    }       
        res.send('Produto inserido com sucesso com ' + 'id = ' +dados);
    }, next);    
});

servidor.put('/produtos/:idProdutos', (req,res, next) => {
    const idProduto = req.params.idProdutos;
    knex('produtos')
        .where( 'id', idProduto)
        .update(req.body)
        .then( (dados) => {
    if( !dados ){
        return res.send( new errors.BadRequestError('Produto não atualizado'));
    }
        res.send('Produto Atualizado');
    }, next);    
});

servidor.del('/produtos/:idProdutos', (req,res, next) => {
    const idProduto = req.params.idProdutos;
    knex('produtos')
        .where( 'id', idProduto)
        .delete()
        .then( (dados) => {
    if( !dados ){
        return res.send(new errors.BadRequestError('Produto não excluido'));
    }
        res.send('Produto excluido com sucesso!');
    }, next);    
});

servidor.get('/pedidos_produtos/:idPedidos_Produtos', (req,res, next) => {
    const idPedido = req.params.idPedidos_Produtos;
    knex('pedidos_produtos')
        .where( 'id', idPedido)
        .first()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto e Pedido não encontrados'));
        }
        res.send(dados);
    }, next);    
});

servidor.post('/pedidos_produtos', (req,res, next) => {
    knex('pedidos_produtos')
        .insert(req.body)
        .then( (dados) => {
    if( !dados ){
        return res.send(new errors.BadRequestError('Produto e Pedido não encontrados'));
    }
        res.send('Produto e pedido inseridos com sucesso! ' +'id = '+dados);
    }, next);    
});

servidor.put('/pedidos_produtos/:idPedidos_Produtos', (req,res, next) => {
    const idPedido = req.params.idPedidos_Produtos;
    knex('pedidos_produtos')
        .where( 'id', idPedido)
        .update(req.body)
        .then( (dados) => {
        if( !dados ){
            return res.send( new errors.BadRequestError('Produto e Pedido não atualizados tente novamente!'));
        }
        res.send('Produto e Pedido Atualizados');
    }, next);    
});

servidor.del('/pedidos_produtos/:idPedidos_Produtos', (req,res, next) => {
    const idPedido = req.params.idPedidos_Produtos;
    knex('pedidos_produtos')   
        .where( 'id', idPedido)
        .delete()
        .then( (dados) => {
        if( !dados ){
            return res.send(new errors.BadRequestError('Produto e Pedido não excluidos tente novamente!'));
        }
        res.send('Produto e Pedido excluidos com sucesso!');
    }, next);    
});

//Cria vetor vazio para o armanezamento dos dados
let VetorUsuario = []

//Armazena os valores do cadastro usuário
let NomeUsuario = document.getElementById("nome")
let SenhaUsuario = document.getElementById("senha")
let EmailUsuario = document.getElementById("email")

//Armazena os valores do cadastro alimentador
let IDalimentador = document.getElementById("ID")
let NomePet = document.getElementById("namePet")
let IntervaloTime = document.getElementById("time")
let QuantiAlimento = document.getElementById("kg")

//Armazena os valores para a pesquisa e edição dos dados do alimentador
let idalimentador = document.getElementById("IDA")
let nomePet = document.getElementById("namePetE")
let intervaloTempo = document.getElementById("InterTempo")
let quantiAlimento = document.getElementById("kag")

//Armazena os valores de login do usuário
let nomeLogin = document.getElementById("name")
let senhaLogin = document.getElementById("password")

//Armazena as quantidades declarada pelo usuário
let PesoReferencia = document.getElementById("DadosQuantidadeRacao")
let guardaPesoReferencia = 2

//Criar uma variável para armazenar a posição e permitir a verificação
let posicao, posicaoAlimentador, Achou

//Url para linkar com o arduino
url = "http://192.168.150.50"


function cadastro() {

    //Puxa o vetor do LocalStorage
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Verifica se o vetor é nulo
    //Se for nulo, cria o vetor (Chamando o já criado a cima)
    //Se não for nulo, executa a função
    if (VetorUsuario == null) {

        VetorUsuario = []
        realizaCadastro()

    } else {

        realizaCadastro()

    }
}
function realizaCadastro() {

    //Cria o bjeto com as suas propriedades
    let ObjetoUsuario = {

        Nome: NomeUsuario.value,
        Senha: SenhaUsuario.value,
        Email: EmailUsuario.value,
        //Cria um vetor como uma propriedade dentro de um objeto, para armazenar os dados do Alimentador
        Alimentadores: []
    }

    //Joga o objeto para dentro do VetorUsuario
    VetorUsuario.push(ObjetoUsuario)
    //Envia os dados para o LocalStorage
    localStorage.setItem('Usuario', JSON.stringify(VetorUsuario))

    //Permite cadastrar mesmo sem os dados
    NomeUsuario.value = ''
    SenhaUsuario.value = ''
    EmailUsuario.value = ''

}
function Login() {

    //Criar variáveis de para permitir a verificação
    let logou = false
    let login

    //Puxa o vetor do LocalStorage
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Percorre o vetor com o for
    for (i = 0; i < VetorUsuario.length; i++) {

        //Faz a verificação
        if (nomeLogin.value == VetorUsuario[i].Nome && senhaLogin.value == VetorUsuario[i].Senha) {

            //Deteta o usuário logado
            login = VetorUsuario[i].Nome

            logou = true

        }

    }

    if (logou) {

        //Envia os dados para o LocalStorage
        localStorage.setItem('LoginON', JSON.stringify(login))
        window.location = "menu.html"

    } else {

        alert("Não foi possivel realizar o login")
        //Permite logar mesmo sem os dados
        NomeUsuario.value = ''
        SenhaUsuario.value = ''
    }
}
function Sair() {

    //O usuário sai da conta
    login = ''
    localStorage.setItem('LoginON', JSON.stringify(login))
    alert('Tchau :D')

}
function BotaoCadastroAlimentador() {

    //Puxa os dados do LocalStorage
    login = JSON.parse(localStorage.getItem('LoginON'))
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Percorre o vetor com o for
    for (i = 0; i < VetorUsuario.length; i++) {

        //Faz a verificação
        if (login == VetorUsuario[i].Nome) {

            //Verifica se o vetor alimentador é nulo
            //Se for nulo, cria o vetor (Chamando o já criado a cima)
            //Se não for nulo, executa a função CadastroAlimentador
            if (VetorUsuario[i].Alimentadores == null) {

                VetorUsuario[i].Alimentadores = []

                CadastroAlimentador()

            } else {

                CadastroAlimentador()

            }

        }

    }

}
function CadastroAlimentador() {

    //Cria o bjeto com as suas propriedades
    let ObjetoAlimentador = {

        ID: IDalimentador.value,
        NomePet: NomePet.value,
        IntervaloTempo: IntervaloTime.value,
        QuantidadeAlimento: QuantiAlimento.value

    }

    //Joga o objeto para dentro do Vetor Alimentador
    VetorUsuario[i].Alimentadores.push(ObjetoAlimentador)
    //Envia os dados para o LocalStorage
    localStorage.setItem('Usuario', JSON.stringify(VetorUsuario))
    //Permite cadastrar alimentadores mesmo sem os dados
    IDalimentador.value = ''
    NomePet.value = ''
    IntervaloTime.value = ''
    QuantiAlimento.value = ''

}
function EditarCadastro() {

    //Puxa os dados do LocalStorage
    login = JSON.parse(localStorage.getItem('LoginON'))
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Percorre o vetor com o for para achar os dados no vetor
    for (i = 0; i < VetorUsuario.length; i++) {

        //Faz a verificação
        if (login == VetorUsuario[i].Nome) {
            posicao = i

            //Envia os dados armazenado dos inputs para o vetor nas posições específivas
            VetorUsuario[posicao].Nome = NomeUsuario.value
            VetorUsuario[posicao].Senha = SenhaUsuario.value
            VetorUsuario[posicao].Email = EmailUsuario.value
        }
    }

    //Joga os dados no LocalStorage
    localStorage.setItem('Usuario', JSON.stringify(VetorUsuario))

}
function pesquisarCadastro() {

    //Puxa os dados do LocalStorage
    login = JSON.parse(localStorage.getItem('LoginON'))
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Percorre o vetor com o for
    for (i = 0; i < VetorUsuario.length; i++) {


        //Faz a verificação
        if (login == VetorUsuario[i].Nome) {
            posicao = i

            //Envia os dados armazenados nos próprios inputs para permitir a pesquisa
            document.getElementById("nome").value = VetorUsuario[posicao].Nome
            document.getElementById("senha").value = VetorUsuario[posicao].Senha
            document.getElementById("email").value = VetorUsuario[posicao].Email

        }


    }


}
function ExcluirCadastro() {

    //Puxa os dados do LocalStorage
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Armazena o nome a ser excluído
    nomeExcluir = document.getElementById("excluiconta")

    //Percorre o vetor com o for para achar o nome e a posição
    for (i = 0; i < VetorUsuario.length; i++) {

        //Faz a verificação
        if (nomeExcluir.value == VetorUsuario[i].Nome) {

            posicao = i
            //Exclui a propriedade na posição
            VetorUsuario.splice(posicao, 1)

        }
    }

    //Joga os dados no LocalStorage
    localStorage.setItem('Usuario', JSON.stringify(VetorUsuario))
    localStorage.setItem('LoginON', JSON.stringify(-1))

    //Volta para a tela de login
    window.location = "telaDeLogin.html"

}
function editarAlimentador() {

    //Puxa os dados do LocalStorage
    login = JSON.parse(localStorage.getItem('LoginON'))
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Percorre o vetor com o for para achar os dados no vetor
    for (i = 0; i < VetorUsuario.length; i++) {

        //Faz a verificação
        if (login == VetorUsuario[i].Nome) {
            posicao = i

            //Percorre o vetor com o for para achar a posição da propriedade do alimentador
            for (j = 0; j < VetorUsuario[i].Alimentadores.length; j++) {

                //Faz a verificação
                if (idalimentador.value == VetorUsuario[i].Alimentadores[j].ID) {

                    Achou = true
                    posicaoAlimentador = j

                    //Faz a verificação
                    if (Achou == true) {

                        //Envia os dados armazenados nos próprios inputs para permitir a edição
                        VetorUsuario[posicao].Alimentadores[posicaoAlimentador].ID = idalimentador.value
                        VetorUsuario[posicao].Alimentadores[posicaoAlimentador].NomePet = nomePet.value
                        VetorUsuario[posicao].Alimentadores[posicaoAlimentador].IntervaloTempo = intervaloTempo.value
                        VetorUsuario[posicao].Alimentadores[posicaoAlimentador].QuantidadeAlimento = quantiAlimento.value

                    }

                }




            }


        }
    }

    //Joga os dados no LocalStorage
    localStorage.setItem('Usuario', JSON.stringify(VetorUsuario))


}
function pesquisarAlimentador() {

    //Puxa os dados do LocalStorage
    login = JSON.parse(localStorage.getItem('LoginON'))
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Percorre o vetor com o for para achar os dados no vetor
    for (i = 0; i < VetorUsuario.length; i++) {

        //Faz a verificação e declara a posição
        if (login == VetorUsuario[i].Nome) {
            posicao = i


            //Percorre o vetor com o for para achar os dados no vetor alimentador
            for (j = 0; j < VetorUsuario[i].Alimentadores.length; j++) {


                //Faz a verificação na posição do ID para permitir a pesquisa
                if (idalimentador.value == VetorUsuario[i].Alimentadores[j].ID) {

                    Achou = true
                    posicaoAlimentador = j

                    if (Achou == true) {

                        //Envia os dados armazenados nos próprios inputs para permitir a pesquisa
                        document.getElementById("IDA").value = VetorUsuario[posicao].Alimentadores[posicaoAlimentador].ID
                        document.getElementById("namePetE").value = VetorUsuario[posicao].Alimentadores[posicaoAlimentador].NomePet
                        document.getElementById("InterTempo").value = VetorUsuario[posicao].Alimentadores[posicaoAlimentador].IntervaloTempo
                        document.getElementById("kag").value = VetorUsuario[posicao].Alimentadores[posicaoAlimentador].QuantidadeAlimento

                    } else {
                        //Deixa o input vazio
                        document.getElementById("IDA").value = ''

                    }

                }

            }




        }

    }

alert


}
function ExcluirCadastroAlimentador() {

    //Puxa os dados do LocalStorage
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Armazena os dados para excluir
    let alimentadorExcluir = document.getElementById("alimentaExcluir").value

    //Puxa os dados do LocalStorage
    login = JSON.parse(localStorage.getItem('LoginON'))
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))

    //Percorre o vetor com o for para achar os dados no vetor
    for (i = 0; i < VetorUsuario.length; i++) {

        //Faz a verificação e declara a posição
        if (login == VetorUsuario[i].Nome) {
            posicao = i

            //Percorre o vetor com o for para achar os dados no vetor Alimentador
            for (j = 0; j < VetorUsuario[i].Alimentadores.length; j++) {


                //Faz a verificação e declara a posição
                if (alimentadorExcluir == VetorUsuario[i].Alimentadores[j].ID) {

                    Achou = true
                    posicaoAlimentador = j

                }



            }


        }
    }

    //Faz a verificação
    if (Achou == true) {

        //Exclui o alimentador na posição declarada
        alert("Alimentador excluido com sucesso")
        VetorUsuario[posicao].Alimentadores.splice(posicaoAlimentador, 1)

    } else {

        alert('Não foi possivel excluir o alimentador')


    }

    //Joga os dados no LocalStorage
    localStorage.setItem('Usuario', JSON.stringify(VetorUsuario))
}
function Listar() {

    //Cria uma variável vazia
    let ListarAlimentador = ''

    //Puxa os dados do LocalStorage
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))
    login = JSON.parse(localStorage.getItem('LoginON'))

    //Percorre o vetor com o for para achar os dados no vetor
    for (i = 0; i < VetorUsuario.length; i++) {

        //Faz a verificação
        if (login == VetorUsuario[i].Nome) {

            //Percorre o vetor com o for para achar os dados no vetor Alimentador
            for (j = 0; j < VetorUsuario[i].Alimentadores.length; j++) {

                //Lista os dados do alimentador (ID)
                ListarAlimentador = ListarAlimentador + '<tr>' + '<td>' + Object.values(VetorUsuario[i].Alimentadores[j].ID).join('') + '</td>' + '<br>'


            }

        }

    }

    //O mesmo procedimento explicado acima
    let ListarPet = ''
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))
    login = JSON.parse(localStorage.getItem('LoginON'))

    for (i = 0; i < VetorUsuario.length; i++) {

        if (login == VetorUsuario[i].Nome) {

            for (j = 0; j < VetorUsuario[i].Alimentadores.length; j++) {

                //Lista os dados do alimentador (Nome)
                ListarPet = ListarPet + '<tr>' + Object.values(VetorUsuario[i].Alimentadores[j].NomePet).join('') + '</tr>' + '<br>'

            }
        }

    }
    //O mesmo procedimento explicado acima
    let ListarIntervalo = ''
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))
    login = JSON.parse(localStorage.getItem('LoginON'))

    for (i = 0; i < VetorUsuario.length; i++) {

        if (login == VetorUsuario[i].Nome) {

            for (j = 0; j < VetorUsuario[i].Alimentadores.length; j++) {

                //Lista os dados do alimentador (Intervalo de tempo)
                ListarIntervalo = ListarIntervalo + '<td>' + Object.values(VetorUsuario[i].Alimentadores[j].IntervaloTempo).join('') + '</td>' + '<br>'

            }

        }

    }

    //O mesmo procedimento explicado acima
    let ListarQuantidade = ''
    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))
    login = JSON.parse(localStorage.getItem('LoginON'))

    for (i = 0; i < VetorUsuario.length; i++) {

        if (login == VetorUsuario[i].Nome) {

            for (j = 0; j < VetorUsuario[i].Alimentadores.length; j++) {

                //Lista os dados do alimentador (Quantidade)
                ListarQuantidade = ListarQuantidade + '<td>' + Object.values(VetorUsuario[i].Alimentadores[j].QuantidadeAlimento).join('') + '</td>' + '</tr>' + '<br>'

            }
        }

    }


    //Demonstra os dados cadastrados numa listagem
    document.getElementById("DadosID").innerHTML = ListarAlimentador
    document.getElementById("DadosNomePet").innerHTML = ListarPet
    document.getElementById("DadosIntervaloTempo").innerHTML = ListarIntervalo
    document.getElementById("DadosQuantidadeRacao").innerHTML = ListarQuantidade
}
function MostraUserLogado() {

    //Mostra o usuário logado
    document.getElementById("Bemvindo").innerHTML = "Bem Vindo, " + JSON.parse(localStorage.getItem('LoginON'))
    //chama as funções para executar enquanto o usuário estiver logado.
    Listar()
    CalcularTempo()
}
function MotorAbrir() {
    console.log("Aberto")
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/motor/abrir", true);
    xhttp.send();

}
function MotorFechar() {
    console.log("fechado")
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/motor/fechar", true);
    xhttp.send();

}
function MedirBalanca() {

    VetorUsuario = JSON.parse(localStorage.getItem('Usuario'))
    login = JSON.parse(localStorage.getItem('LoginON'))


    for (i = 0; i < VetorUsuario.length; i++) {

        if (login == VetorUsuario[i].Nome) {

            guardaPesoReferencia = Object.values(VetorUsuario[0].Alimentadores[0].QuantidadeAlimento)
        }

    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let peso = this.responseText;
            console.log(guardaPesoReferencia)
            if (peso <= guardaPesoReferencia) {


                MotorAbrir()

            }
            if (peso > guardaPesoReferencia) {

                MotorFechar()

            }
        }

    };
    xhttp.open("GET", url + "/balanca", true);
    xhttp.send();

}
function CalcularTempo() {


    // IntervaloTempo = IntervaloTempo.value * 600

    setInterval(function () {
        MedirBalanca()
    }, 1000);



}
<script></script>


<template>
    <section id="contacto" class="shadow-4 border-round">
        <div class="texto">
            <div class="text-center px-8">
                <h2 class="text-900 font-bold mb-2">CONTACTO</h2>
            </div>
            <div class="text-center px-8">
                <span class="text-600 text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a enim nec nisl
                    ullamcorper eleifend. Praesent risus leo, fringilla et nulla at, egestas euismod orci. </span>
            </div>
        </div>


        <div class="flex flex-column col-12">
            <div class="grid py-4 px-4 lg:px-8 mx-0">
                <div class="col-12 lg:col-6 align-items-center justify-content-center p-8">
                    <h4 class="text-black text-2xl font-bold">Utiliza las siguientes vías de contacto, o rellena el
                        formulario.</h4>

                    <Divider layout="horizontal" align="center"></Divider>

                    <p class="text-600 text-1xl">
                        Vía E-mail
                    </p>
                    <a href="">hola@unsitiogenial.es</a>
                    <Divider layout="horizontal" align="center"></Divider>
                    <p class="text-600 text-1xl">
                        En nuestras redes sociales
                    </p>
                    <div class="flex gap-3">
                        <a href="#"> <i class="pi pi-facebook" style="color: rgb(68, 68, 180);"></i> Facebook</a>
                        <a href="#"><i class="pi pi-whatsapp" style=" color: rgb(65, 183, 79);"></i> Whatsapp</a>
                        <a href="#"><i class="pi pi-telegram" style=" color: rgb(57, 205, 255);"></i> Telegram</a>
                    </div>
                    <Divider layout="horizontal" align="center"></Divider>
                    <p class="text-600 text-1xl">
                        Por teléfono
                    </p>
                    <span>91-1234-567</span>

                </div>

                <div class="col-12 lg:col-6 flex flex-column align-items-center justify-content-center p-8">
                    <div class="flex flex-column gap-5">
                        <div class="p-float-label">
                            <InputText id="name" type="text" style="width: 40rem;"  />
                            <label for="name">Escribe tu nombre</label>
                        </div>
                        <div class="p-float-label">
                            <InputText id="email" type="text" style="width: 40rem;"  />
                            <label for="email">Escribe tu e-mail </label>
                        </div>
                        <div class="p-float-label">
                            <InputText id="cel1" type="text" style="width: 40rem;"  />
                            <label for="cel1">Escribe tu teléfono (Opcional)</label>
                        </div>
                        <div class="p-float-label">
                            <Textarea id="message" rows="6" style="width: 40rem;" />
                            <label for="message">Escribe tu comentario</label>
                        </div>

                    </div>
                    <Button label="Enviar" rounded></Button>
                </div>

            </div>
        </div>

    </section>
</template>


<style >
.texto {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 0px 180px 0px 180px;
}

#contacto {
    padding-top: 80px;
    border-color: #d6d6d6;
    border-style: solid;
    border-radius: 71px;
    border-width: 0.5px;
    padding-top: 80px;
    margin-right: 80px;
    margin-left: 80px;
    margin-bottom: 80px;
}

@media only screen and (max-width: 800px) {
    #contacto {
        padding-top: 80px;
        margin: 0;
        border: none;
    }

    .texto {
        display: flex;
        flex-direction: column;
        width: fit-content;
        margin: 0;
    }
}

.contacto a {
    color: black;
}
</style>

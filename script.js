window.onload = function(){
    var init = function(){
        handleCollect();
    }

    var handleCollect = function(){
        var select = document.getElementsByClassName("j-select");

        handleCreate(select);
    }

    var handleCreate = function(select){
        var ui_wrap       = [];
        var ui_select     = [];
        var ui_option_box = [];
        var ui_option     = "";

        for( var i=0; i<select.length; i++ ){
            ui_option = "";

            // ui-wrap 생성
            ui_wrap[i] = document.createElement("div");
            ui_wrap[i].classList.add("ui-wrap");
            select[i].parentNode.insertBefore( ui_wrap[i], select[i] );

            // ui-select 생성
            ui_select[i] = document.createElement("div");
            ui_select[i].classList.add("ui-select");
            ui_select[i].innerText = select[i].children[0].text;
            ui_wrap[i].appendChild(ui_select[i]);

            // ui-option-box 생성
            ui_option_box[i] = document.createElement("ul");
            ui_option_box[i].classList.add("ui-option-box");
            ui_wrap[i].appendChild(ui_option_box[i]);

            // ui-option 생성
            for( var index=0; index<select[i].children.length; index++ ){
                ui_option += "<li class='ui-option' data-value="+select[i].children[index].value+">"+select[i].children[index].text+"</li>";
            }

            ui_option_box[i].innerHTML = ui_option;
        }

        handleSelect( ui_wrap, ui_select, ui_option_box );
    }

    var handleSelect = function( ui_wrap, ui_select, ui_option_box ){
        var ui_option = document.getElementsByClassName("ui-option");

        for( var i=0; i<ui_select.length; i++ ){
            ui_select[i].addEventListener("click", function(e){
                this.classList.toggle("active");

                // ui-option-box active toggle
                this.nextSibling.classList.toggle("active");
            });

            ui_wrap[i].addEventListener("mouseleave", function(){
                // mouseleave 시 ui-select 및 ui-option-wrap active 제거
                for( var index=0; index<this.children.length; index++ ){
                    this.children[index].classList.remove("active");
                }
            });

        }

        for( var i=0; i<ui_option.length; i++ ){
            ui_option[i].addEventListener("click", function(e){
                // li 클릭시 ui-select 변경
                this.parentNode.previousSibling.innerText = e.target.innerText;

                // li 클릭시 ui-option-box 제거
                this.parentNode.classList.remove("active");

                // li 클릭시 해당 옵션 선택
                document.querySelector("option[value="+e.target.getAttribute("data-value")+"]").selected = true;
            });
        }
    }

    init();

}

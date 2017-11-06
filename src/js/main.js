if (document.getElementsByClassName('nav-list').length) {
    var nav = document.querySelector('.nav'),
        navList = document.querySelector('.nav-list'),
        navItems = ['Find events', 'Create an event', 'Help', 'News', 'About us', 'Contact us', 'Downloads', 'Privacy policy ', 'Terms of use'],
        inputs = document.getElementsByTagName('input'),
        popup = document.querySelector('.popup'),
        count = 0,
        dropList = 0,
        item,
        link,
        itemClass = 'nav-list__item',       
        linkClass = 'nav-list__link',
        popItemClass = 0,
        poplinkClass = 0;

    // добавляем классы в DOM (поддержка IE-9)
    function hasClass(ele,cls) {
        return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    }
      
    function addClass(ele,cls) {   
        if (!hasClass(ele,cls)) ele.className += " "+cls;
    }
    // End -->

    function addItemsHeader(count) {
        for(var i = 0; i < (count || navItems.length); i++) {
            function createElems(index, dropList, popItemClass, popLinkClass) {
        // создаем элемент списка, присваиваем класс и добавляем в DOM
                item = document.createElement('li');    
                addClass(item, popItemClass || itemClass);
                (dropList || navList).appendChild(item);
        // создаем ссылку списка с аттрибутами и добавляем в DOM
                link = document.createElement('a');     
                link.setAttribute('href', '');
                addClass(link, popLinkClass || linkClass);
                link.textContent = navItems[i];
                item.appendChild(link);
            }
            createElems(i);
        }
        // создаем "div, a" для дропдауна и добавляем в DOM
        link = document.createElement('div');  
        linkText = document.createElement('a');        
        link.className = 'nav-link';
        linkText.className = 'nav-link__text';
        linkText.textContent = '...';
        nav.appendChild(link);
        link.appendChild(linkText);
        navItems.splice(0, i)       // убираем уже созданные элементы из массива
        link.appendChild(popup);
        // End -->
        // создаем элементы списка дропдауна, присваиваем классы и добавляем в DOM
        if (count) {                                
            dropList = document.querySelector('.popup-list');   
            popItemClass = 'popup-list__item';
            popLinkClass = 'popup-list__link';

            for(i = 0; i < navItems.length; i++) {
                createElems(i, dropList, popItemClass, popLinkClass);
            }
            navItems.splice(0, i)   // убираем уже созданные элементы из массива
        }
        // End -->
    }

    // PlaceHolders - добавляем, убираем значения инпутов при наступлении событий
    function addPlaceHolders() {
        for(var j = 0; j < inputs.length; j++) {        
            inputs[j].onfocus = function() {
                if (this.value === this.getAttribute('data-name')) this.value = '';
            }
            inputs[j].onblur = function() {
                if (this.value === '' || this.value === ' ') this.value = this.getAttribute('data-name')
            }
        }
    }
    // End -->

    // Вызов основной функции
    window.onload = function initMenu() {
        addPlaceHolders()
        if(navItems.length) {
            if (navItems.length <= 3 ) {
                addItemsHeader(count);
            } else {
                addItemsHeader(3);
            }
            // вызываем dropdown            
            var activeLink = document.querySelector('.nav-link');
            activeLink.addEventListener('click', function() {
                addClass(popup, 'active');
            })
            // убираем dropdown
            document.addEventListener('mouseup', function() {
                popup.className = 'popup';
            })
        }
    };
    // End -->    
}


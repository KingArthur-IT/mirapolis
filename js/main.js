//open video modal
document.querySelector('.about__video').addEventListener('click', () => {
  document.querySelector('.video-modal').classList.add('modal-display');
  setTimeout(() => {
    document.querySelector('.video-modal').classList.add('modal-visible');
    const videElem = document.querySelector('.modal__video');
    if (videElem){
      videElem.currentTime = 0;
      videElem.play();
    }
  }, 100);
});

const bikesArr = ['1', '2', '3', '4', '5', '6']
const iframeSrc = [
  'https://sketchfab.com/models/e08f8882cb8a458290a58bfd6e862e9e/embed?autostart=1',
  'https://sketchfab.com/models/71e2f9e2279940aea4bc680181465236/embed?autostart=1',
  'https://sketchfab.com/models/8cbea5d4b23748b89e4943977285e0aa/embed?autostart=1',
  'https://sketchfab.com/models/7a29c9eda5d349e995b656c44c3b9b29/embed?autostart=1',
  'https://sketchfab.com/models/fcb1bd4ba3954a47b5beae82d20419a4/embed?autostart=1',
  'https://sketchfab.com/models/cf775e9339de4ba88a32f9c9bd9ce348/embed?autostart=1'
]

bikesArr.forEach(index => {
  document.querySelector(`.show-modal-bike-${index}`).addEventListener('click', () => {
    const modal = document.querySelector(`.modal-bike-${index}`);
    modal.classList.add('modal-display');
    modal.querySelector('iframe').setAttribute('src', iframeSrc[index - 1]);
    setTimeout(() => {
      modal.classList.add('modal-visible');
    }, 100);
  })
})

//close modal
const closeVideoModal = () => {
  document.querySelector('.modal__video')?.pause();
  document.querySelector('.video-modal').classList.remove('modal-visible');
  setTimeout(() => {
    document.querySelector('.video-modal').classList.remove('modal-display');
  }, 300);
}
const close3DModal = (index) => {
  const modal = document.querySelector(`.modal-bike-${index}`);
  modal.classList.remove('modal-visible');
  setTimeout(() => {
    modal.classList.remove('modal-display');
    modal.querySelector('iframe').removeAttribute('src');
  }, 300);
}
document.querySelector('.video-modal')?.addEventListener('click', () => closeVideoModal());
bikesArr.forEach(index => document.querySelector(`.modal-bike-${index}`)?.addEventListener('click', () => close3DModal(index)))
document.querySelectorAll('.modal__hero').forEach(el => el.addEventListener('click', (e) => e.stopPropagation()));

//tabs
const daoTab = document.querySelector('tab-dao');
const strategicTab = document.querySelector('tab-strategic');
const exchangeTab = document.querySelector('tab-exchange');

const daoTabContent = document.querySelector('tab-content-dao');
const strategicTabContent = document.querySelector('tab-content-strategic');
const exchangeTabContent = document.querySelector('tab-content-exchange');

const tabsArr = ['dao', 'strategic', 'exchange'];

tabsArr.forEach(el => {
  document.querySelector(`.tab-${el}`).addEventListener('click', () => {
    tabsArr.filter(item => item != el).forEach(t => {
      document.querySelector(`.tab-${t}`).classList.remove('active');
      document.querySelector(`.tab-content-${t}`).classList.add('d-none');
    })
    document.querySelector(`.tab-${el}`).classList.add('active');
    document.querySelector(`.tab-content-${el}`).classList.remove('d-none');
  })
})

//table
// document.querySelector('.diagramms__table-btn').addEventListener('click', () => {
//   document.querySelectorAll('.short-table').forEach((el) => el.classList.toggle('d-none'))
//   document.querySelectorAll('.full-table').forEach((el) => el.classList.toggle('d-none'))
// })

//svg animation
const svgItemsArr = ['ecosystem', 'seed', 'private', 'kols', 'ido', 'team', 'in-game', 'staking', 'liquidity', 'marketing'];
svgItemsArr.forEach((item) => {
  const svgPath = document.querySelector(`.svg-${item}`);
  if (svgPath){

    svgPath.addEventListener('mouseover', (e) => {
      svgPath.classList.add('svg-show-shadow');
      svgItemsArr.filter((i) => i !== item).forEach((el) => document.querySelector(`.item-${el}`).classList.add('opacity-02'))
    })

    svgPath.addEventListener('mouseleave', (e) => {
      e.target.classList.remove('svg-show-shadow');
      svgItemsArr.forEach((el) => document.querySelector(`.item-${el}`).classList.remove('opacity-02'))
    })
  }
})


//diagramm
// const diagrammArr = ['game', 'staking', 'community', 'presale', 'sale', 'reserve', 'team', 'coin', 'ecosystem', 'partners', 'liquidity', 'marketing']
// diagrammArr.forEach((item) => {
//   const svgPath = document.querySelector(`.diagramm-${item}`);
//   if (svgPath){

//     svgPath.addEventListener('mouseover', (e) => {
//       svgPath.classList.add('svg-show-shadow');
//       document.querySelector(`.diagramm-${item}-bg`)?.classList.add('opacity0');
//       document.querySelector(`.diagramm-${item}-text`)?.classList.add(`${item}-text-fill`);
//     })

//     svgPath.addEventListener('mouseleave', (e) => {
//       document.querySelector(`.diagramm-${item}-bg`)?.classList.remove('opacity0');
//       document.querySelector(`.diagramm-${item}-text`)?.classList.remove(`${item}-text-fill`);
//       setTimeout(() => {
//         e.target.classList.remove('svg-show-shadow');
//       }, 400);
//     })
//   }
// })

//menu
document.querySelector('.header__burger').addEventListener('click', () => {
  document.querySelector('.menu').classList.add('opened');
});

document.querySelector('.menu__close').addEventListener('click', () => {
  document.querySelector('.menu').classList.remove('opened');
});

document.querySelectorAll('.menu__anchor').forEach( (el) => {
  el.addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('opened');
  })
})

//roadmap show all on 4th quater
const roadmapShowAllBtn = document.querySelector('.roadmap__show-all');
roadmapShowAllBtn.addEventListener('click', () => {
  roadmapShowAllBtn.classList.add('d-none');
  document.querySelectorAll('.roadmap__item-hidden').forEach(el => el.classList.add('show-item') )
});


//dropdown
document.querySelectorAll('.dropdown').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('active');
  })
})

//ACCORDEON
var accordeons = document.querySelectorAll(".accordeon__head");

accordeons.forEach((item, index) => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
        const panel = item.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        };

        //remove from others
        [...accordeons].filter((el, inx) => inx != index).forEach(element => {
            element.classList.remove("active");
            const panel = element.nextElementSibling;
            panel.style.maxHeight = null;
        });
      });
});
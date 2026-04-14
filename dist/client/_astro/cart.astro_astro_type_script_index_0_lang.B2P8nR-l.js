document.addEventListener("DOMContentLoaded",function(){function p(){const o=localStorage.getItem("playerstall_cart");return o?JSON.parse(o):[]}function b(o){localStorage.setItem("playerstall_cart",JSON.stringify(o)),S(),y()}function S(){const i=p().reduce((d,l)=>d+l.quantity,0),s=document.querySelector(".cart-count");s&&(s.textContent=i),window.dispatchEvent(new CustomEvent("cartUpdated",{detail:{count:i}}))}function y(){const o=p(),i=document.getElementById("cart-items-container"),s=document.getElementById("cart-empty-message"),d=document.getElementById("cart-items-body"),l=document.getElementById("cart-subtotal"),g=document.getElementById("cart-total");if(o.length===0){i&&(i.style.display="none"),s&&(s.style.display="block");return}i&&(i.style.display="block"),s&&(s.style.display="none");let u=0,x="";o.forEach((t,n)=>{const e=t.price*t.quantity;u+=e;const r=t.planner||t.id&&t.id.startsWith("planner-");let a="";if(r&&t.accessories){let c="";t.accessories.length&&(c=`<ul class="ot-acc-list" style="margin-left:20px">${t.accessories.map(f=>`<li><span class="ot-acc-label">${f.label}</span><span class="ot-acc-price">+$${f.price}</span></li>`).join("")}</ul>`),a=`<span class="ot-item-name">${t.name} <span class="ot-base-price">$${(t.basePrice??0).toLocaleString("en-US",{minimumFractionDigits:2})}</span></span><span class="ot-item-spec">${t.widthIn}″W × ${t.depthIn}″D</span><ul class="ot-item-spec-bullets"><li>${t.colorLabel}</li></ul>${c}`}else if(r&&t.model){const c=t.model.split(" · "),f=[],E=[];for(let m=1;m<c.length;m++)c[m].includes("(+$")?E.push(c[m]):f.push(c[m]);const B=f.join(" · ");let w="";E.length&&(w=`<ul class="ot-acc-list" style="margin-left:20px">${E.map(m=>`<li>${m}</li>`).join("")}</ul>`),a=`<span class="ot-item-name">${t.name}</span><span class="ot-item-spec">${B}</span>${w}`}else a=`<span class="cart-item-name">${t.name}</span>${t.model?`<br /><span class="cart-item-description">${t.model}</span>`:""}`;x+=`
					<tr class="cart_item">
						<td class="product-remove">
							<a href="#" class="remove" data-index="${n}" aria-label="Remove this item">×</a>
						</td>
						<td class="product-thumbnail">
							<img src="${t.image}" alt="${t.name}" width="32" height="32" style="width: 32px !important; height: 32px !important; max-width: 32px !important; max-height: 32px !important; min-width: 32px !important; min-height: 32px !important; object-fit: cover; display: block; margin: 0; padding: 0; background: #ffffff;" />
						</td>
						<td class="product-name" data-title="Product">
							${a}
						</td>
						<td class="product-price" data-title="Price">
							<span class="woocommerce-Price-amount amount">
								<bdi><span class="woocommerce-Price-currencySymbol">$</span>${t.price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</bdi>
							</span>
						</td>
						<td class="product-quantity" data-title="Quantity">
							<div class="quantity-control">
								<input type="number" class="quantity-input qty-input" value="${t.quantity}" min="1" max="999" data-index="${n}" />
								<div class="quantity-spinner">
									<button type="button" class="qty-btn qty-up" data-index="${n}" aria-label="Increase quantity">&#9650;</button>
									<button type="button" class="qty-btn qty-down" data-index="${n}" aria-label="Decrease quantity">&#9660;</button>
								</div>
							</div>
						</td>
						<td class="product-subtotal" data-title="Subtotal">
							<span class="woocommerce-Price-amount amount">
								<bdi><span class="woocommerce-Price-currencySymbol">$</span>${e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</bdi>
							</span>
						</td>
					</tr>
				`}),d&&(d.innerHTML=x),l&&(l.textContent=u.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}));const h=document.getElementById("handling-cost"),L=h?parseFloat(h.textContent||"0"):0,I=document.getElementById("shipping-cost"),D=I?parseFloat(I.textContent||"0"):0,F=u+L+D;g&&(g.textContent=F.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),document.querySelectorAll(".remove").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const e=n.currentTarget,r=parseInt(e.getAttribute("data-index")??"0",10),a=p();a.splice(r,1),b(a)})}),document.querySelectorAll(".qty-input").forEach(t=>{t.addEventListener("change",()=>{const n=t,e=parseInt(n.getAttribute("data-index")??"0",10),r=Math.min(999,Math.max(1,parseInt(n.value,10)||1));n.value=String(r);const a=p();a[e].quantity=r,b(a),y()})}),document.querySelectorAll(".qty-up").forEach(t=>{t.addEventListener("click",()=>{const n=t.closest(".quantity-control"),e=n?n.querySelector(".qty-input"):null;if(!e)return;const r=parseInt(e.getAttribute("data-index")??"0",10),a=Math.min(999,(parseInt(e.value,10)||1)+1);e.value=String(a);const c=p();c[r].quantity=a,b(c),y()})}),document.querySelectorAll(".qty-down").forEach(t=>{t.addEventListener("click",()=>{const n=t.closest(".quantity-control"),e=n?n.querySelector(".qty-input"):null;if(!e)return;const r=parseInt(e.getAttribute("data-index")??"0",10),a=Math.max(1,(parseInt(e.value,10)||1)-1);e.value=String(a);const c=p();c[r].quantity=a,b(c),y()})})}y(),S(),window.addEventListener("cartUpdated",function(){y()}),setTimeout(function(){const o=document.querySelector(".shipping-calculator-button"),i=document.querySelector(".woocommerce-shipping-calculator-form"),s=document.querySelector(".shipping-display");o&&i&&o.addEventListener("click",d=>{d.preventDefault();const l=i,g=o,u=l.style.display==="none"||!l.style.display;l.style.display=u?"block":"none",s&&(s.style.display=u?"none":"block"),g.textContent=u?"Cancel":"Calculate shipping"})},100);const $=document.querySelectorAll('.woocommerce-shipping-methods input[type="radio"]'),q=document.getElementById("shipping-cost"),v=document.getElementById("handling-cost"),C=document.getElementById("cart-total");$.length&&q&&C&&$.forEach(o=>{o.addEventListener("change",()=>{const s=p().reduce((x,h)=>x+h.price*h.quantity,0),d=v?parseFloat(v.textContent||"0"):0,l=o;(l.value==="flat_rate"||l.value==="local_pickup")&&(q.textContent="0.00");const g=parseFloat(q.textContent||"0"),u=s+d+g;C.textContent=u.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})})})});

document.addEventListener("DOMContentLoaded",function(){function u(){const a=localStorage.getItem("playerstall_cart");return a?JSON.parse(a):[]}function h(a){localStorage.setItem("playerstall_cart",JSON.stringify(a)),b(),p()}function b(){const c=u().reduce((r,s)=>r+s.quantity,0),o=document.querySelector(".cart-count");o&&(o.textContent=c),window.dispatchEvent(new CustomEvent("cartUpdated",{detail:{count:c}}))}function p(){const a=u(),c=document.getElementById("cart-items-container"),o=document.getElementById("cart-empty-message"),r=document.getElementById("cart-items-body"),s=document.getElementById("cart-subtotal"),m=document.getElementById("cart-total");if(a.length===0){c&&(c.style.display="none"),o&&(o.style.display="block");return}c&&(c.style.display="block"),o&&(o.style.display="none");let l=0,q="";a.forEach((t,e)=>{const n=t.price*t.quantity;l+=n,q+=`
					<tr class="cart_item">
						<td class="product-remove">
							<a href="#" class="remove" data-index="${e}" aria-label="Remove this item">×</a>
						</td>
						<td class="product-thumbnail">
							<img src="${t.image}" alt="${t.name}" width="32" height="32" style="width: 32px !important; height: 32px !important; max-width: 32px !important; max-height: 32px !important; min-width: 32px !important; min-height: 32px !important; object-fit: cover; display: block; margin: 0; padding: 0; background: #ffffff;" />
						</td>
						<td class="product-name" data-title="Product">
							<span class="cart-item-name">${t.name}</span>${t.model?`<br /><span class="cart-item-description">${t.model}</span>`:""}
						</td>
						<td class="product-price" data-title="Price">
							<span class="woocommerce-Price-amount amount">
								<bdi><span class="woocommerce-Price-currencySymbol">$</span>${t.price.toFixed(2)}</bdi>
							</span>
						</td>
						<td class="product-quantity" data-title="Quantity">
							<div class="quantity-control">
								<input type="number" class="quantity-input qty-input" value="${t.quantity}" min="1" max="999" data-index="${e}" />
								<div class="quantity-spinner">
									<button type="button" class="qty-btn qty-up" data-index="${e}" aria-label="Increase quantity">&#9650;</button>
									<button type="button" class="qty-btn qty-down" data-index="${e}" aria-label="Decrease quantity">&#9660;</button>
								</div>
							</div>
						</td>
						<td class="product-subtotal" data-title="Subtotal">
							<span class="woocommerce-Price-amount amount">
								<bdi><span class="woocommerce-Price-currencySymbol">$</span>${n.toFixed(2)}</bdi>
							</span>
						</td>
					</tr>
				`}),r&&(r.innerHTML=q),s&&(s.textContent=l.toFixed(2));const y=document.getElementById("handling-cost"),I=y?parseFloat(y.textContent||"0"):0,C=document.getElementById("shipping-cost"),S=C?parseFloat(C.textContent||"0"):0,w=l+I+S;m&&(m.textContent=w.toFixed(2)),document.querySelectorAll(".remove").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const n=e.currentTarget,d=parseInt(n.getAttribute("data-index")??"0",10),i=u();i.splice(d,1),h(i)})}),document.querySelectorAll(".qty-input").forEach(t=>{t.addEventListener("change",()=>{const e=t,n=parseInt(e.getAttribute("data-index")??"0",10),d=Math.min(999,Math.max(1,parseInt(e.value,10)||1));e.value=String(d);const i=u();i[n].quantity=d,h(i),p()})}),document.querySelectorAll(".qty-up").forEach(t=>{t.addEventListener("click",()=>{const e=t.closest(".quantity-control"),n=e?e.querySelector(".qty-input"):null;if(!n)return;const d=parseInt(n.getAttribute("data-index")??"0",10),i=Math.min(999,(parseInt(n.value,10)||1)+1);n.value=String(i);const g=u();g[d].quantity=i,h(g),p()})}),document.querySelectorAll(".qty-down").forEach(t=>{t.addEventListener("click",()=>{const e=t.closest(".quantity-control"),n=e?e.querySelector(".qty-input"):null;if(!n)return;const d=parseInt(n.getAttribute("data-index")??"0",10),i=Math.max(1,(parseInt(n.value,10)||1)-1);n.value=String(i);const g=u();g[d].quantity=i,h(g),p()})})}p(),b(),window.addEventListener("cartUpdated",function(){p()}),setTimeout(function(){const a=document.querySelector(".shipping-calculator-button"),c=document.querySelector(".woocommerce-shipping-calculator-form"),o=document.querySelector(".shipping-display");a&&c&&a.addEventListener("click",r=>{r.preventDefault();const s=c,m=a,l=s.style.display==="none"||!s.style.display;s.style.display=l?"block":"none",o&&(o.style.display=l?"none":"block"),m.textContent=l?"Cancel":"Calculate shipping"})},100);const x=document.querySelectorAll('.woocommerce-shipping-methods input[type="radio"]'),f=document.getElementById("shipping-cost"),E=document.getElementById("handling-cost"),v=document.getElementById("cart-total");x.length&&f&&v&&x.forEach(a=>{a.addEventListener("change",()=>{const o=u().reduce((q,y)=>q+y.price*y.quantity,0),r=E?parseFloat(E.textContent||"0"):0,s=a;(s.value==="flat_rate"||s.value==="local_pickup")&&(f.textContent="0.00");const m=parseFloat(f.textContent||"0"),l=o+r+m;v.textContent=l.toFixed(2)})})});

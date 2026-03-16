document.addEventListener("DOMContentLoaded",function(){function u(){const a=localStorage.getItem("playerstall_cart");return a?JSON.parse(a):[]}function g(a){localStorage.setItem("playerstall_cart",JSON.stringify(a)),f(),p()}function f(){const c=u().reduce((r,s)=>r+s.quantity,0),o=document.querySelector(".cart-count");o&&(o.textContent=c),window.dispatchEvent(new CustomEvent("cartUpdated",{detail:{count:c}}))}function p(){const a=u(),c=document.getElementById("cart-items-container"),o=document.getElementById("cart-empty-message"),r=document.getElementById("cart-items-body"),s=document.getElementById("cart-subtotal"),m=document.getElementById("cart-total");if(a.length===0){c&&(c.style.display="none"),o&&(o.style.display="block");return}c&&(c.style.display="block"),o&&(o.style.display="none");let l=0,x="";a.forEach((t,e)=>{const n=t.price*t.quantity;l+=n,x+=`
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
				`}),r&&(r.innerHTML=x),s&&(s.textContent=l.toFixed(2));const E=document.getElementById("shipping-cost"),v=E?parseFloat(E.textContent):0,C=l+v;m&&(m.textContent=C.toFixed(2)),document.querySelectorAll(".remove").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const n=e.currentTarget,d=parseInt(n.getAttribute("data-index")??"0",10),i=u();i.splice(d,1),g(i)})}),document.querySelectorAll(".qty-input").forEach(t=>{t.addEventListener("change",()=>{const e=t,n=parseInt(e.getAttribute("data-index")??"0",10),d=Math.min(999,Math.max(1,parseInt(e.value,10)||1));e.value=String(d);const i=u();i[n].quantity=d,g(i),p()})}),document.querySelectorAll(".qty-up").forEach(t=>{t.addEventListener("click",()=>{const e=t.closest(".quantity-control"),n=e?e.querySelector(".qty-input"):null;if(!n)return;const d=parseInt(n.getAttribute("data-index")??"0",10),i=Math.min(999,(parseInt(n.value,10)||1)+1);n.value=String(i);const y=u();y[d].quantity=i,g(y),p()})}),document.querySelectorAll(".qty-down").forEach(t=>{t.addEventListener("click",()=>{const e=t.closest(".quantity-control"),n=e?e.querySelector(".qty-input"):null;if(!n)return;const d=parseInt(n.getAttribute("data-index")??"0",10),i=Math.max(1,(parseInt(n.value,10)||1)-1);n.value=String(i);const y=u();y[d].quantity=i,g(y),p()})})}p(),f(),window.addEventListener("cartUpdated",function(){p()}),setTimeout(function(){const a=document.querySelector(".shipping-calculator-button"),c=document.querySelector(".woocommerce-shipping-calculator-form"),o=document.querySelector(".shipping-display");a&&c&&a.addEventListener("click",r=>{r.preventDefault();const s=c,m=a,l=s.style.display==="none"||!s.style.display;s.style.display=l?"block":"none",o&&(o.style.display=l?"none":"block"),m.textContent=l?"Cancel":"Calculate shipping"})},100);const q=document.querySelectorAll('.woocommerce-shipping-methods input[type="radio"]'),h=document.getElementById("shipping-cost"),b=document.getElementById("cart-total");q.length&&h&&b&&q.forEach(a=>{a.addEventListener("change",()=>{const o=u().reduce((m,l)=>m+l.price*l.quantity,0),r=a;(r.value==="flat_rate"||r.value==="local_pickup")&&(h.textContent="0.00");const s=o+0;b.textContent=s.toFixed(2)})})});

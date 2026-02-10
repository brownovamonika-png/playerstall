document.addEventListener("DOMContentLoaded",function(){function r(){const e=localStorage.getItem("playerstall_cart");return e?JSON.parse(e):[]}function m(e){localStorage.setItem("playerstall_cart",JSON.stringify(e)),g(),u()}function g(){const n=r().reduce((s,l)=>s+l.quantity,0),c=document.querySelector(".cart-count");c&&(c.textContent=n),window.dispatchEvent(new CustomEvent("cartUpdated",{detail:{count:n}}))}function u(){const e=r(),n=document.getElementById("cart-items-container"),c=document.getElementById("cart-empty-message"),s=document.getElementById("cart-items-body"),l=document.getElementById("cart-subtotal"),h=document.getElementById("cart-total");if(e.length===0){n&&(n.style.display="none"),c&&(c.style.display="block");return}n&&(n.style.display="block"),c&&(c.style.display="none");let d=0,x="";e.forEach((t,i)=>{const a=t.price*t.quantity;d+=a,x+=`
					<tr class="cart_item">
						<td class="product-remove">
							<a href="#" class="remove" data-index="${i}" aria-label="Remove this item">×</a>
						</td>
						<td class="product-thumbnail">
							<img src="${t.image}" alt="${t.name}" width="32" height="32" style="width: 32px !important; height: 32px !important; max-width: 32px !important; max-height: 32px !important; min-width: 32px !important; min-height: 32px !important; object-fit: cover; display: block; margin: 0; padding: 0; background: #ffffff;" />
						</td>
						<td class="product-name" data-title="Product">
							${t.name}
						</td>
						<td class="product-price" data-title="Price">
							<span class="woocommerce-Price-amount amount">
								<bdi><span class="woocommerce-Price-currencySymbol">$</span>${t.price.toFixed(2)}</bdi>
							</span>
						</td>
						<td class="product-quantity" data-title="Quantity">
							<div class="quantity-control">
								<input type="number" class="quantity-input qty-input" value="${t.quantity}" min="1" max="999" data-index="${i}" />
								<div class="quantity-spinner">
									<button type="button" class="qty-btn qty-up" data-index="${i}" aria-label="Increase quantity">&#9650;</button>
									<button type="button" class="qty-btn qty-down" data-index="${i}" aria-label="Decrease quantity">&#9660;</button>
								</div>
							</div>
						</td>
						<td class="product-subtotal" data-title="Subtotal">
							<span class="woocommerce-Price-amount amount">
								<bdi><span class="woocommerce-Price-currencySymbol">$</span>${a.toFixed(2)}</bdi>
							</span>
						</td>
					</tr>
				`}),s&&(s.innerHTML=x),l&&(l.textContent=d.toFixed(2));const v=document.getElementById("shipping-cost"),E=v?parseFloat(v.textContent):0,C=d+E;h&&(h.textContent=C.toFixed(2)),document.querySelectorAll(".remove").forEach(t=>{t.addEventListener("click",function(i){i.preventDefault();const a=parseInt(this.getAttribute("data-index")),o=r();o.splice(a,1),m(o)})}),document.querySelectorAll(".qty-input").forEach(t=>{t.addEventListener("change",function(){const i=parseInt(this.getAttribute("data-index")),a=Math.min(999,Math.max(1,parseInt(this.value)||1));this.value=a;const o=r();o[i].quantity=a,m(o),u()})}),document.querySelectorAll(".qty-up").forEach(t=>{t.addEventListener("click",function(){const i=parseInt(this.getAttribute("data-index")),a=this.closest(".quantity-control"),o=a?a.querySelector(".qty-input"):null;if(!o)return;const p=Math.min(999,(parseInt(o.value)||1)+1);o.value=p;const y=r();y[i].quantity=p,m(y),u()})}),document.querySelectorAll(".qty-down").forEach(t=>{t.addEventListener("click",function(){const i=parseInt(this.getAttribute("data-index")),a=this.closest(".quantity-control"),o=a?a.querySelector(".qty-input"):null;if(!o)return;const p=Math.max(1,(parseInt(o.value)||1)-1);o.value=p;const y=r();y[i].quantity=p,m(y),u()})})}u(),g(),window.addEventListener("cartUpdated",function(){u()}),setTimeout(function(){const e=document.querySelector(".shipping-calculator-button"),n=document.querySelector(".woocommerce-shipping-calculator-form"),c=document.querySelector(".shipping-display");e&&n&&e.addEventListener("click",function(s){s.preventDefault();const l=n.style.display==="none"||!n.style.display;n.style.display=l?"block":"none",c&&(c.style.display=l?"none":"block"),this.textContent=l?"Cancel":"Calculate shipping"})},100);const q=document.querySelectorAll('.woocommerce-shipping-methods input[type="radio"]'),f=document.getElementById("shipping-cost"),b=document.getElementById("cart-total");q.length&&f&&b&&q.forEach(e=>{e.addEventListener("change",function(){const c=r().reduce((h,d)=>h+d.price*d.quantity,0);let s=0;(this.value==="flat_rate"||this.value==="local_pickup")&&(s=0,f.textContent="0.00");const l=c+s;b.textContent=l.toFixed(2)})})});

i=(r=_=>readline().split` `)()
e={}
for(j=0;j<i[7];j++){u=r()
e[u[0]]=u[1]}
for(;;){y=r()
c=y[0]
C=parseInt(y[1])
d=y[2]
t=i[3]==c?i[4]:e[c]
print(C-t&d[0]!=(C>t?"L":"R")?"BLOCK":"WAIT")}
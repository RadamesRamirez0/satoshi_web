import React from 'react';

const page = () => {
  return (
    <div className='font-satoshi [&>h2]:text-xl [&>h2]:font-bold [&>p]:pb-2 '>
      <h1 className='text-2xl font-bold text-center'>Aviso de Riesgo</h1>
      <p>
        El presente Aviso de Riesgo establece un listado enunciativo, pero no limitativo o
        exhaustivo de los riesgos inherentes asociados al uso, compra, venta y posesión de
        activos virtuales. El Cliente reconoce expresamente que, al realizar operaciones
        con activos virtuales a través de los servicios prestados por Satoshi Payments,
        S.A.S. de C.V. (“Satoshi Payments”), conoce y entiende que existen riesgos
        representativos en relación con la tecnología, aspectos económicos y legales,
        entre otros. En este sentido, el Cliente acepta ser el único responsable del
        manejo de los riesgos y las consecuencias que esto conlleva. Satoshi Payments no
        será responsable de los daños ocurridos derivados de la materialización de los
        riesgos.
      </p>
      <h2>Respaldo de los activos virtuales.</h2>
      <p>
        Los activos virtuales son representaciones de valor registradas electrónicamente y
        utilizadas entre el público como medio de pago para todo tipo de actos jurídicos y
        cuya transferencia únicamente puede llevarse a cabo a través de medios
        electrónicos. Un activo virtual no es una divisa ni una moneda de curso legal y
        como tal, no es emitido ni se encuentra respaldado por el gobierno de México ni
        por el Banco de México. Esto quiere decir que las criptomonedas, al ser activos
        virtuales, no se encuentran protegidas por un banco central ni por alguna
        institución financiera.
      </p>
      <h2>Volatilidad del valor de los activos virtuales.</h2>
      <p>
        El valor de los activos virtuales se define conforme a la oferta y demanda, la
        cual depende de la confianza de los compradores en la tecnología que le da
        seguridad y operatividad a las mismas. Debido a esto, su valor es altamente
        volátil, lo cual implica que puede aumentar o disminuir de un momento a otro. La
        adquisición y el uso de estos activos conllevan un alto riesgo de depreciación y,
        por ende, de pérdidas monetarias. Satoshi Payments, no será responsable por
        pérdidas totales o parciales derivadas de las operaciones realizadas con
        criptomonedas por parte del Cliente.
      </p>
      <h2>Riesgos tecnológicos y de fraude.</h2>
      <p>
        Debido a la complejidad de los procesos matemáticos y criptográficos que soportan
        a las criptomonedas, existen riesgos tecnológicos, cibernéticos y de fraude. Los
        activos virtuales se almacenan de manera digital, en nodos de la red distribuida
        conocidos como Blockchain. Existen procesos para evitar su falsificación, tales
        como la revisión del registro distribuido que contiene el histórico de
        transacciones, así como el proceso de minado. Sin embargo, estos procesos pueden
        sufrir vulnerabilidades, tales como descomposición de cualquier Blockchain o
        ataques mineros. Adicionalmente, la facilidad de replicar el código de los activos
        virtuales facilita la generación de nuevos activos virtuales con el fin de obtener
        alguna ganancia, generar esquemas de fraude, obtener recursos para ser desviados
        hacia actividades de lavado de dinero y financiamiento al terrorismo.
      </p>
      <h2>Riesgos legales.</h2>
      <p>
        Las actividades de Satoshi Payments, se encuentran sujetas al régimen de
        actividades vulnerables establecido en la Ley Federal para la Prevención e
        Identificación de Operaciones con Recursos de Procedencia Ilícita. Esta ley define
        como actividad vulnerable la operación de entidades no financieras con activos
        virtuales.
      </p>
      <h2>Riesgos asociados al servicio.</h2>
      <p>
        Una vez que el Cliente realice operaciones con activos virtuales a través de los
        servicios prestados por Satoshi Payments, será imposible revertirlas. El servicio
        de custodia y almacenamiento de criptomonedas es proporcionado por un tercero de
        conformidad con los Términos y Condiciones, por lo que no es responsabilidad de
        Satoshi Payments. Sin embargo, Satoshi Payments, verificará que las operaciones
        efectivamente se realicen, así como que la custodia se mantenga.
      </p>
    </div>
  );
};

export default page;

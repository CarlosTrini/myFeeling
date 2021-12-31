import { useContext, useEffect } from "react";
import Layout from "../components/pages/Layout";
import authContext from "../context/authContext/authContext";


export default function Home() {
  const { statusLogin, userSession, loginFn, closeSessionFn } = useContext(authContext);

  const handleLogin = () => loginFn();
  const handleClose = () => closeSessionFn();

  useEffect(() => {
    statusLogin();
    console.log('USER-SESSION ==> ', userSession.uid)
  }, [userSession]);

  return (
    <Layout>
      <div className='top-margin' >
        <h1>HOME</h1>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio sapiente ratione laudantium inventore at ex, ullam earum corporis rem ab enim laboriosam exercitationem quidem labore voluptate debitis quia atque voluptas placeat expedita? Numquam voluptatum est nam maiores eum quia, minima illum incidunt neque necessitatibus officiis perferendis quas dolorum nostrum sed dolore praesentium debitis? Delectus laudantium accusamus, fugiat magnam odio animi voluptatibus eum? Rem quae labore impedit consectetur quis libero quos aliquam eos repudiandae architecto similique temporibus, ducimus et voluptatem. Placeat nesciunt assumenda, vero animi illo nobis, qui praesentium omnis fugit eum doloremque totam dicta mollitia dolorum impedit obcaecati iusto nam! Nemo molestiae, quae assumenda asperiores magnam consequuntur maiores, accusantium hic perspiciatis recusandae odio distinctio necessitatibus aliquid ipsam quis eveniet sit illo nobis expedita aspernatur sequi, neque enim sapiente at! Sed sunt deserunt ipsum natus eius ipsa asperiores! Consequuntur qui temporibus quos, labore nulla non, ad, explicabo praesentium neque at atque animi sequi? Aut id eaque voluptate natus autem hic iure fuga, dolorum saepe odio distinctio vel nobis officiis labore quo blanditiis odit illum neque beatae maxime explicabo sapiente et? Odit distinctio facilis id magni quisquam velit fugiat doloribus nemo autem vero! Qui, illo facere laboriosam repellat sit vel minus assumenda fugit magni numquam corporis quia officia ea nobis, eligendi facilis impedit eaque, sequi autem neque. Soluta optio, natus hic aliquid iusto ex laudantium qui quis quas ea. Adipisci, incidunt. Nesciunt veniam consequatur dolore earum neque, recusandae repudiandae, nihil tenetur explicabo, dolorum tempore doloremque corrupti repellat laboriosam iure temporibus molestias pariatur architecto minima? Earum harum fuga dolorum officia, illo sunt doloremque hic velit accusamus quae ad aspernatur nobis, dolores necessitatibus animi vitae quibusdam id pariatur facilis cupiditate eos eligendi neque! Consequatur temporibus blanditiis vel architecto iusto eius, rem tempora repudiandae dolore obcaecati distinctio perspiciatis ducimus id consectetur quaerat hic! Optio saepe expedita atque impedit nulla! Commodi, iure minus laudantium distinctio illum totam voluptatibus sunt suscipit iste, sed libero quaerat, nisi nihil porro. Necessitatibus omnis consectetur delectus aspernatur est quaerat natus unde sapiente rerum, ab ex cumque vero, quis similique, laboriosam accusamus? Deserunt provident rem rerum repellendus incidunt nisi aliquam tempora facere atque culpa commodi, eum animi nulla blanditiis doloremque delectus quam in consequuntur! Explicabo eveniet nostrum neque. Necessitatibus voluptate porro cupiditate, voluptatum tempora, officiis at quia, cumque quae voluptatem quas! Nam atque officia nobis iste rerum in fugit incidunt voluptate corrupti fugiat iusto deleniti ut quae sapiente soluta cum, quas placeat sed harum dolorum quis. Reiciendis asperiores atque sunt sit, soluta temporibus minus saepe necessitatibus vitae accusantium velit eligendi mollitia quo tenetur eaque veniam impedit unde quidem iure debitis cumque doloribus quibusdam? Sequi saepe officia totam iusto at facere quo, consequuntur quasi obcaecati consectetur suscipit exercitationem corporis magnam. Inventore quidem natus consequuntur, tempore veritatis dicta harum non quibusdam ullam repudiandae nostrum vero molestiae cumque ab minima maxime corporis cupiditate doloremque obcaecati? Illo, beatae voluptatem ipsum cum ad minus nisi cupiditate sint culpa sapiente enim provident perspiciatis facilis autem ducimus tenetur voluptas expedita esse numquam earum praesentium animi consequatur reprehenderit laudantium. Modi!
      </p>


    </Layout>
  )
}

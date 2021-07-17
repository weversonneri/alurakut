import React, { useEffect, useState } from 'react'

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault
} from '../src/lib/AlurakutCommons';

import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { MainGrid } from '../src/components/MinGrid';
import { Box } from '../src/components/Box';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [community, setCommunity] = useState([{
    id: '12802378123789378912789789123896123',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    url: 'https://www.orkut.br.com/MainCommunity?cmm=10000'
  }]);


  const githubUser = 'weversonneri';

  useEffect(() => {
    try {
      (async () => {
        const [wers, wing] = await Promise.all([
          fetch('https://api.github.com/users/weversonneri/followers'),
          fetch('https://api.github.com/users/weversonneri/following')
        ]);

        const gitFollowers = await wers.json();
        const gitFollowing = await wing.json();
        setFollowers(gitFollowers);
        setFollowing(gitFollowing);
      })();

    } catch (err) {
      console.error(err)
    }

  }, []);

  console.log('render');

  const handleCreateCommunity = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const image = formData.get('image')
      ? formData.get('image')
      : `https://source.unsplash.com/random/400x400?sig=${new Date().getTime()}`;

    const newCommunity = {
      id: new Date().getTime(),
      title: formData.get('title'),
      url: formData.get('url'),
      image,
    }


    setCommunity([...community, newCommunity]);
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a),
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">
              O que você deseja fazer?
            </h2>

            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  placeholder="Qual o nome da comunidade?"
                  name="title"
                  aria-label="Qual o nome da comunidade?"
                  type="text"
                />
              </div>

              <div>
                <input
                  placeholder="Url da imagem para usar como capa"
                  name="image"
                  aria-label="Url da imagem para usar como capa"
                />
              </div>

              <div>
                <input
                  placeholder="Endereço da pagina da comunidade"
                  name="url"
                  aria-label="Endereço da pagina da comunidade"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>

          </Box>

        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores
              {' '}
              <span
                style={{ color: '#2E7BB4', fontSize: 14 }}
              >
                ({followers.length})
              </span>
            </h2>

            <ul>
              {followers.slice(0, 6).map((item) => (
                <li key={item.id} >
                  <a
                    href={item.html_url}
                  >
                    <img src={item.avatar_url} />
                    <span>{item.login}</span>
                  </a>
                </li>
              ))}
            </ul>

            <hr />

            <h2 className="smallTitle">
              Ver todos
            </h2>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguindo
              {' '}
              <span
                style={{ color: '#2E7BB4', fontSize: 14 }}
              >
                ({following.length})
              </span>
            </h2>

            <ul>
              {following.slice(0, 6).map((item) => (
                <li key={item.id} >
                  <a
                    href={item.html_url}
                  >
                    <img src={item.avatar_url} />
                    <span>{item.login}</span>
                  </a>
                </li>
              ))}
            </ul>

            <hr />

            <h2 className="smallTitle">
              Ver todos
            </h2>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades
              {' '}
              <span
                style={{ color: '#2E7BB4', fontSize: 14 }}
              >
                ({community.length})
              </span>
            </h2>

            <ul>
              {community.slice(0, 6).map((item) => (
                <li key={item.id} >
                  <a
                    href={item.url}
                    target="_blank"
                  >
                    <img src={item.image} />
                    <span>{item.title}</span>
                  </a>
                </li>

              ))}
            </ul>

            <hr />
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

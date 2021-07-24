import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

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

      <AlurakutProfileSidebarMenuDefault click='ok' />
    </Box>
  )
}

const actionButton = [
  {
    id: 1,
    title: 'Criar comunidade',
    active: true
  },
  {
    id: 2,
    title: 'Deixar um scrap',
    active: false
  }
];

const initialScrapForm = {
  username: "",
  message: ""
}

export default function Home(props) {
  const [userData, setUserData] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [community, setCommunity] = useState([]);
  const [scrap, setScrap] = useState([]);

  const [scrapForm, setScrapForm] = useState(initialScrapForm);

  const [activeActionButton, setActiveActionButton] = useState(2);

  const token = process.env.NEXT_PUBLIC_DATOCMS_KEY;

  const githubUser = props.githubUser;

  useEffect(() => {
    try {
      (async () => {
        const [user, wers, wing] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUser}`),
          fetch(`https://api.github.com/users/${props.githubUser}/followers`),
          fetch(`https://api.github.com/users/${props.githubUser}/following`)
        ]);

        const gitUser = await user.json();
        const gitFollowers = await wers.json();
        const gitFollowing = await wing.json();
        setUserData(gitUser);
        setFollowers(gitFollowers);
        setFollowing(gitFollowing);
      })();

    } catch (err) {
      console.error(err)
    }

    fetch(
      'https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `{
            allComunidadeskuts{
              id,
              title,
              imageUrl,
              pageUrl,
              creatorSlug
            }
          }`
        }),
      }
    )
      .then(res => res.json())
      .then((res) => {
        setCommunity(res.data.allComunidadeskuts)
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(
      'https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `{
              allScrapskuts {
                id,
                username,
                message
              }
            }`
        }),
      }
    )
      .then(res => res.json())
      .then((res) => {
        setScrap(res.data.allScrapskuts)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  console.log('render');

  const handleCreateCommunity = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const imageUrl = formData.get('image')
      ? formData.get('image')
      : `https://source.unsplash.com/random/400x400?sig=${new Date().getTime()}`;

    const newCommunityForm = {
      title: formData.get('title'),
      pageUrl: formData.get('page-url'),
      imageUrl,
      creatorSlug: githubUser
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommunityForm)
    }).then(async (res) => {
      const dados = await res.json();
      const { id, title, pageUrl, imageUrl, creatorSlug } = dados.createCommunity;

      const newCommunity = {
        id,
        title,
        pageUrl,
        imageUrl,
        creatorSlug
      };
      setCommunity([...community, newCommunity]);
    });

  };

  const handleScrapChange = (event) => {
    setScrapForm({
      ...scrapForm,
      [event.target.name]: event.target.value
    });
  };

  const handleCreateScrap = (event) => {
    event.preventDefault();
    if (scrapForm.username === "" || scrapForm.message === "") {
      alert('Preencha seu username do github com uma mensagem para deixar um scrap');
      return;
    }

    fetch('/api/scraps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scrapForm)
    }).then(async (res) => {
      const dados = await res.json();
      const { id, username, message } = dados.createScrap;

      const newScrap = {
        id,
        username,
        message
      };

      setScrapForm(initialScrapForm);
      alert('Scrap enviado com sucesso!');
      setScrap([...scrap, newScrap]);
    })
  }

  console.log('render');

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
              Bem vindo(a), {userData.name && userData.name.split(" ", 1)}
            </h1>
            <span className="daily-quote">
              <strong>Sorte de hoje: </strong>
              O melhor profeta do futuro é o passado
            </span>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">
              O que você deseja fazer?
            </h2>

            {actionButton.map((item) => (
              <button
                key={item.id}
                className={activeActionButton === item.id ? "is-active" : "top-button"}
                onClick={() => setActiveActionButton(item.id)}
                title={item.title}
              >
                {item.title}
              </button>
            ))}

            {activeActionButton === 1
              &&
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
                  name="page-url"
                  aria-label="Endereço da pagina da comunidade"
                />
              </div>

                <button
                  title="Criar comunidade"
                >
                Criar comunidade
              </button>

              </form>}

            {activeActionButton === 2
              &&
              <form onSubmit={handleCreateScrap}>
                <div>
                  <input
                    placeholder="Qual seu nome de usuario do github?"
                    name="username"
                    aria-label="Qual seu nome de usuario do github?"
                    type="text"
                    value={scrapForm.username}
                    onChange={handleScrapChange}
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Digite sua mensagem"
                    name="message"
                    value={scrapForm.message}
                    onChange={handleScrapChange}
                  />
                </div>

                <button
                  title="Enviar recado"
                >
                  Enviar scrap
                </button>

            </form>
            }

          </Box>

          {activeActionButton === 2
            &&
            <Box>
              <h2 className="subTitle">
                Scraps
                {' '}
                <span
                  style={{ color: '#2E7BB4', fontSize: 14 }}
                >
                  ({scrap.length})
                </span>
              </h2>

              <div className="scraps-box">
                <ul>
                  {scrap.map((item) => (
                    <li key={item.id}>
                      <img src={`https://github.com/${item.username}.png`} />
                      <span>
                        <a
                          href={`https://github.com/${item.username}`}
                          className="boxLink"
                          style={{ fontSize: '13px' }}
                          title="username no github"
                        >
                          @{item.username}
                        </a>
                        <p style={{ marginTop: '5px' }}>
                          {item.message}
                        </p>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
          </Box>
          }

        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores
              {' '}
              <span
                style={{ color: '#2E7BB4', fontSize: 14 }}
              >
                ({userData.followers})
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

            <a href="#" className="showAllTitle">
              Ver todos
            </a>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguindo
              {' '}
              <span
                style={{ color: '#2E7BB4', fontSize: 14 }}
              >
                ({userData.following})
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

            <a href="#" className="showAllTitle">
              Ver todos
            </a>
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
                    href={item.pageUrl}
                    target="_blank"
                  >
                    <img src={item.imageUrl} />
                    <span>{item.title}</span>
                  </a>
                </li>

              ))}
            </ul>

            <hr />
            <a href="#" className="showAllTitle">
              Ver todos
            </a>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}


export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies["@Alurakut:user_token"];

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((res) => res.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  }
}

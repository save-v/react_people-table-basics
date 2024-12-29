import cN from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

import { Loader } from '../Loader';

interface TabsProps {
  people: Person[];
  isLoading: boolean;
  hasError: boolean;
}

import { useParams } from 'react-router-dom';

export const PeopleTable: React.FC<TabsProps> = ({
  people,
  isLoading,
  hasError,
}) => {
  const { selectedUserSlug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading && <Loader />}

          {!isLoading && people.length === 0 && !hasError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && people.length !== 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => {
                  const {
                    sex,
                    born,
                    died,
                    mother,
                    father,
                    slug,
                    motherName,
                    fatherName,
                  } = person;

                  return (
                    <tr
                      key={slug}
                      data-cy="person"
                      className={cN({
                        'has-background-warning': slug === selectedUserSlug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>

                      <td>
                        {mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          motherName || '-'
                        )}
                      </td>

                      <td>
                        {father ? (
                          <PersonLink person={father} />
                        ) : (
                          fatherName || '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

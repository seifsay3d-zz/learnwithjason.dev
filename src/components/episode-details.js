import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import gsap from 'gsap';
import { IconShare } from './icon-share.js';
import { IconInfo } from './icon-info.js';
import { EpisodePoster } from './episode-poster.js';

export function EpisodeDetails({
  title,
  teacher,
  teacherImage,
  description,
  url,
}) {
  const ref = useRef();
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (navigator.share) {
      setCanShare(true);
    }
  }, []);

  useEffect(() => {
    const details = ref.current;

    // reset the animation in case folks click fast
    gsap.set(details.querySelectorAll('.animate'), {
      left: 0,
      opacity: 1,
    });

    // fly things in for a little bit of extra character
    gsap.from(details.querySelectorAll('.animate'), {
      duration: 0.75,
      left: '150px',
      opacity: 0,
      stagger: 0.05,
      ease: 'back.inOut(1)',
    });
  }, [title]);

  async function handleShare() {
    await navigator.share({
      title: `${title} (with ${teacher})`,
      text: description,
      url,
    });
  }

  return (
    <article class="episode-details dark" ref={ref}>
      <div class="episode-poster animate">
        <EpisodePoster
          title={title}
          teacherName={teacher}
          teacherImage={teacherImage}
        />
      </div>
      <div class="episode-info">
        <h3 class="animate">{title}</h3>
        <p class="gradient-subheading animate">with {teacher}</p>
        <p class="episode-description animate">{description}</p>
        <div class="episode-links">
          <a href={url} class="animate">
            <IconInfo /> Episode Details
          </a>
          {canShare && (
            <button onClick={handleShare} class="animate">
              <IconShare /> Share
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
